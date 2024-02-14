const fs = require('fs');
const path = require('path');
const { getSvelteFiles } = require('./getSvelteFiles');

export function getRootContent(rootPath: string) {
  const filePaths = getSvelteFiles(rootPath); //this will return an array of all file paths that end in .svelte
  let root; //raw code from App.svelte

  //parse through directories taken from getSvelteFiles function and find root
  filePaths.forEach((fileURI: string) => {
    // if filePaths contain .svelte and App.svelte
    if (
      path.extname(fileURI) === '.svelte' &&
      (fileURI.includes('App.svelte') || fileURI.includes('+page.svelte'))
    ) {
      // root contains the contents of App.svelte
      root = fs.readFileSync(fileURI, 'utf-8');
    }
  });
  return root;
}
