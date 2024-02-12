const fs = require('fs');
const path = require('path');
const { getRootContent } = require('./rootContent');
const { getSvelteFiles } = require('./getSvelteFiles');

export function getComponentStructure(rootPath: string) {

// getting root from getRootContent (App.svelte)
 const root = getRootContent(rootPath);
 // getting filePaths array containing the file paths of all svelte files in the application
 const filePaths = getSvelteFiles(rootPath);
 
  // Define a class constructor to store files in a hierarchical structure
  class TreeNode {
    name: string;
    children: object[];

    constructor(name: string) {
      this.name = name;
      this.children = [];
    }
  }
// taking the file contents of App.svelte and turning it into a string
  const rootString = JSON.stringify(root);
  const componentStructure = new TreeNode('App');

  function parseFunc(fileContents = rootString, currTree = componentStructure) {
    //only parse through text within script tags
    for (let i = 0; i < fileContents.length; i++) {
      //if </script
      if (fileContents[i] === '<') {
        if (fileContents[i + 1] === '/') {
            // end the slice at the end of the closing carrot
            fileContents = fileContents.slice(0, i + 9);
            // exit the for loop that contains all export contents - contains all characters from opening script tags to closing script tags 
            break;
        }
      }
    }
    //split file contents' into an array
    const fileContentsArr = fileContents
      .split(/[ ;'"]+/)
      .filter((word) => word.trim() !== '');

    for (let i = 0; i < fileContentsArr.length; i++) {
      //stop loop if file content text are outside of script tags

      if (fileContentsArr[i] === 'import') {
        //create a new instance of treeNode representing the new child
        const newTreeNode = new TreeNode(fileContentsArr[i + 1]);
        //declare a var to grab path [i + 3]
        currTree.children.push(newTreeNode);
        // iterate through the array of file paths 
        for (let j = 0; j < filePaths.length; j++) {
          // if the file name is found in the filePaths array, run fs.readFileSync on that path 
          if (filePaths[j].includes(fileContentsArr[i + 3])) {
            const childData = fs.readFileSync(filePaths[j], 'utf-8');
            let newSourceString = JSON.stringify(childData);
            // invoke parseFunc passing in JSON string of childData contents and newTreeNode 
            parseFunc(newSourceString, newTreeNode);
          }
        }
      }
    }
  }
  parseFunc();
  return componentStructure;
}
