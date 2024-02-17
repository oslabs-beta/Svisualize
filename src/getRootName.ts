const fs = require('fs');
const path = require('path');
const { getSvelteFileNames } = require('./getSvelteFileNames');

export function getRootName(rootPath: string) {
  const fileNames = getSvelteFileNames(rootPath); //this will return an array of all file paths that end in .svelte
  let rootName;

  //parse through directories taken from getSvelteFiles function and find root
  fileNames.forEach((name: string) => {
    // if filePaths contain .svelte and App.svelte
    if (
      path.extname(name) === '.svelte' &&
      (name.includes('App.svelte') || name.includes('+page.svelte'))
    ) {
      // root contains the contents of App.svelte
      const rootNameArr = name.split('.');
      rootName = rootNameArr[0];
    }
  });
  return rootName;
}
