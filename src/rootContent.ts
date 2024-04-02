import fs from 'fs';
import path from 'path';
const { getSvelteFiles } = require('./getSvelteFiles');

//parses through directory and returns the raw code of root file
export function getRootContent(rootPath: string, rootVal: string): string {
  const filePaths = getSvelteFiles(rootPath);
  let root: string | undefined;

  //parse through directories taken from getSvelteFiles function and find root
  filePaths.forEach((fileURI: string) => {
    if (path.extname(fileURI) === '.svelte' && fileURI.includes(rootVal)) {
      root = fs.readFileSync(fileURI, 'utf-8');
    }
  });

  // Check if root is undefined before returning it
  if (root === undefined) {
    throw new Error(`Root file not found for value '${rootVal}'`);
  }

  return root;
}
