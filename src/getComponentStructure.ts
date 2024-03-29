const fs = require('fs');
const path = require('path');
const { getSvelteFiles } = require('./getSvelteFiles');

export function getComponentStructure(
  rootPath: string,
  rootName: string,
  root: string
) {
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
  const componentStructure = new TreeNode(rootName);
  for (let i = 0; i < filePaths.length; i++) {
    if (filePaths[i].includes(rootName)) {
      componentStructure.uri = filePaths[i];
    }
  }

  //recursive function to look inside root and identify children
  function parseFunc(
    fileContents = root,
    currTree = componentStructure,
    uri?: string
  ) {
    for (let i = 0; i < fileContents.length; i++) {
      if (fileContents[i] === '<') {
        if (fileContents[i + 1] === '/') {
          fileContents = fileContents.slice(0, i + 9);
          break;
        }
      }
    }

    const fileContentsArr = fileContents
      .split(/(?:\.(?=[./])|[ ;'"])+/)
      .filter((word: any) => word.trim() !== '');

    for (let i = 0; i < fileContentsArr.length; i++) {
      if (fileContentsArr[i].includes('export')) {
        currTree.props?.push(fileContentsArr[i + 2]);
      }
      if (
        fileContentsArr[i].includes('import') &&
        !fileContentsArr[i + 1].includes('{') &&
        fileContentsArr[i + 2].includes('from') &&
        fileContentsArr[i + 3].includes('.svelte')
      ) {
        const newTreeNode = new TreeNode(fileContentsArr[i + 1]);
        currTree.children.push(newTreeNode);

        // recursive functionality to get all children of parent directory
        for (let j = 0; j < filePaths.length; j++) {
          if (filePaths[j].includes(fileContentsArr[i + 3])) {
            newTreeNode.uri = filePaths[j];
            const childData = fs.readFileSync(filePaths[j], 'utf-8');
            let newSourceString = childData;
            parseFunc(newSourceString, newTreeNode, filePaths[j]);
          }
        }
      }
    }
  }
  parseFunc();
  return componentStructure;
}
