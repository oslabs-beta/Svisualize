const fs = require('fs');
const path = require('path');

export function getSvelteFileNames(dir: string): string[] {
  const files = fs.readdirSync(dir);
  let fileNames: string[] = [];

  files.forEach((file: string) => {
    // dir gives the file path for the folder, file contains the name of the file, joining them together gives complete file path for each file
    const filePath = path.join(dir, file);
    // declare a constant stat and assign it the evaluated result of fs.statSync filePath
    const stat = fs.statSync(filePath);

    // we check if the stat is a directory if true enter the directory
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.svelte-kit') {
        fileNames = fileNames.concat(getSvelteFileNames(filePath));
      }
      // else you have reached a directory that contains no more folders to traverse, if any files in the directory contain .svelte
    } else if (path.extname(filePath) === '.svelte') {
      // push that file path into the filePathArray
      fileNames.push(file);
    }
  });
  // return all .svelte file paths from application
  // console.log('names', fileNames);
  return fileNames;
}
