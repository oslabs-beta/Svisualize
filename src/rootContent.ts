const fs = require('fs');
const path = require('path');
const { getSvelteFiles } = require('./getSvelteFiles');

//parses through directory and returns the raw code of root file
export function getRootContent(rootPath: string, rootVal: string) {
  const filePaths = getSvelteFiles(rootPath);
  let root;

  //parse through directories taken from getSvelteFiles function and find root
  filePaths.forEach((fileURI: string) => {
    if (path.extname(fileURI) === '.svelte' && fileURI.includes(rootVal)) {
      root = fs.readFileSync(fileURI, 'utf-8');
    }
  });
  return root;
}
