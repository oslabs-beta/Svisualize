const fs = require('fs');
const path = require('path');
const { traverseDirectory } = require('./traverseDirectory');


export function parseFile(rootPath: string) {
  const filePaths = traverseDirectory(rootPath); //this will return an array of all file paths that end in .svelte
  let root; //raw code from App.svelte

  //parse through directories taken from traverDirectory function and find root
  filePaths.forEach((fileURI: string) => {
    if (path.extname(fileURI) === '.svelte' && fileURI.includes('App.svelte')) {
      root = fs.readFileSync(fileURI, 'utf-8');
    }
  });

  // Define a class
  class TreeNode {
    name: string;
    children: object[];


  

  let correctPath;
  let rootString = JSON.stringify(root);

  function getFilePaths(rootPath: string) {}

  function parseFunc(fileContents = rootString, currTree = componentStructure) {
    //only parse through text within script tags
    let invoked = 0;
    for (let i = 0; i < fileContents.length; i++) {
      //if </script
      if (fileContents[i] === '<') {
        if (fileContents[i + 1] === '/') {
          if (fileContents[i + 2] === 's') {
            fileContents = fileContents.slice(0, i + 9);
            break;
          }
        }
      }
      //splice after script
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
        for (let j = 0; j < filePaths.length; j++) {
          if (filePaths[j].includes(fileContentsArr[i + 3])) {
            const correctPath = filePaths[j];
            const childData = fs.readFileSync(correctPath, 'utf-8');
            let newSourceString = JSON.stringify(childData);
            parseFunc(newSourceString, newTreeNode);
          }
        }
      }
    }
  }
  parseFunc();
  return componentStructure;
}


