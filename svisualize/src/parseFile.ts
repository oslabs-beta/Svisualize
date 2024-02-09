const fs = require('fs');
const path = require('path');
const { traverseDirectory } = require('./traverseDirectory');

// will use fs.readfilesync to check if there are any import statments
// create a abstract syntax tree to parse svelte file
// traverse ast to find children of component
// push children to array and return result
export function parseFile(rootPath: string) {
  const filePaths = traverseDirectory(rootPath); //this will return an array of all file paths that end in .svelte
  console.log(filePaths);

  let root; //raw code from App.svelte

  //parse through directories taken from traverDirectory function and find root
  filePaths.forEach((fileURI: string) => {
    if (path.extname(fileURI) === '.svelte' && fileURI.includes('App.svelte')) {
      root = fs.readFileSync(fileURI, 'utf-8');
    }
  });

  //stretch goal: we need to add additional filters on line 30 in case their root directory is not named App.svelte

  // Define a class
  class TreeNode {
    name: string;
    children: object[];

    constructor(name: string) {
      this.name = name;
      this.children = [];
    }
  }

  const componentStructure = new TreeNode('App');
  console.log(componentStructure);

  let correctPath;
  let rootString = JSON.stringify(root);

  function parseFunc(fileContents = rootString, currTree = componentStructure) {
    //split file contents' into an array
    const fileContentsArr = fileContents
      .split(/[ ;'"]+/)
      .filter((word) => word.trim() !== '');
    console.log(fileContentsArr);

    for (let i = 0; i < fileContentsArr.length; i++) {
      //stop loop if file content text are outside of script tags
      if (fileContentsArr[i] === '</script>') return;

      if (fileContentsArr[i] === 'import') {
        // children.push(fileContents[i + 1]);

        //create a new instance of treeNode representing the new child
        const newTreeNode = new TreeNode(fileContentsArr[i + 1]);
        currTree.children.push(newTreeNode);

        // for (let j = 0; j < filePaths.length; j++) {
        //   if (filePaths[j].includes(fileContentsArr[i + 3])) {
        //     const correctPath = filePaths[j];
        //     fs.readFile(correctPath, 'utf-8', (err: string, source: string) => {
        //       if (err) {
        //         console.error('Error reading Svelte source file:', err);
        //         return;
        //       }
        //       let newSourceString = JSON.stringify(source);
        //       //children.push(fileContents[i + 1]);
        //       //console.log(children);
        //       // Consider if you really need recursion here
        //       // return parseFunc(newSourceString);
        //     });
        //   }
        // }
      }
    }
  }

  parseFunc();
  return componentStructure;
}
