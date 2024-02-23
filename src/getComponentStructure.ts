const fs = require('fs');
const path = require('path');
const { getRootContent } = require('./rootContent');
const { getSvelteFiles } = require('./getSvelteFiles');

export function getComponentStructure(
  rootPath: string,
  rootName: string,
  root: string
) {
  // getting filePaths array containing the file paths of all svelte files in the application
  const filePaths = getSvelteFiles(rootPath);

  // Define a class constructor to store files in a hierarchical structure
  class TreeNode {
    name: string;
    uri?: string;
    children: TreeNode[];
    props?: string[];

    constructor(name: string, uri?: string) {
      this.name = name;
      this.uri = uri;
      this.children = [];
      this.props = [];
    }
  }
  // taking the file contents of App.svelte and turning it into a string
  // const rootString = JSON.stringify(root);
  const componentStructure = new TreeNode(rootName);

  function parseFunc(
    fileContents = root,
    currTree = componentStructure,
    uri?: string
  ) {
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

      //check for braces and if they are present,
    }

    //split file contents' into an array
    const fileContentsArr = fileContents
      .split(/(?:\.(?=[./])|[ ;'"])+/)
      .filter((word: any) => word.trim() !== '');

      console.log('filecontents', fileContentsArr)

    for (let i = 0; i < fileContentsArr.length; i++) {
      if (fileContentsArr[i].includes('export')) {
        currTree.props?.push(fileContentsArr[i + 2]);
      }
      //stop loop if file content text are outside of script tags
      if (
        fileContentsArr[i].includes('import') &&
        !fileContentsArr[i + 1].includes('{') &&
        fileContentsArr[i + 2].includes('from') &&
        fileContentsArr[i + 3].includes('.svelte')
      ) {
        //check if next arr element contains/includes a bracket. if yes, continue out of loop
        //create a new instance of treeNode representing the new child
        const newTreeNode = new TreeNode(fileContentsArr[i + 1]);
        //declare a var to grab path [i + 3]
        currTree.children.push(newTreeNode);

        // iterate through the array of file paths
        for (let j = 0; j < filePaths.length; j++) {
          // if the file name is found in the filePaths array, run fs.readFileSync on that path
          if (filePaths[j].includes(fileContentsArr[i + 3])) {
            newTreeNode.uri = filePaths[j];
            const childData = fs.readFileSync(filePaths[j], 'utf-8');
            let newSourceString = childData;
            // invoke parseFunc passing in JSON string of childData contents and newTreeNode
            parseFunc(newSourceString, newTreeNode, filePaths[j]);
          }
        }
      }
      // else if (fileContentsArr[i].includes('import') && fileContentsArr[i + 1] !== ('from'))
      //    {
      //     const singleNode = new TreeNode('+layout.svelte')
      //     parseFunc(fs.readFileSync(filePaths[0], 'utf-8'), singleNode, filePaths[0]);
      //     //parseFunc(singleNode);
      //   }
      }
  }
  parseFunc();
  // console.log('structure', componentStructure.children[0]);
  // console.log('structure name', componentStructure.children[0].name);
  return componentStructure;
}
