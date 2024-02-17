const fs = require('fs');
const path = require('path');

// declare a function getSvelteFiles that takes in a string that returns an array of strings
export function getSvelteFiles(dir: string): string[] | string {
  // declare a const files and assign it the array of file names from the specified folder
  if (dir === '' || dir === undefined) {return 'no such file or directory';};
  const files = fs.readdirSync(dir);
  // filePath is an array of strings that is currently empty
  let filePathArray: string[] = [];

  files.forEach((file: string) => {
    // dir gives the file path for the folder, file contains the name of teh file, joining them together gives complete file path for each file
    const filePath = path.join(dir, file);
    // declare a constant stat and assign it the evaluated result of fs.statSync filePath
    const stat = fs.statSync(filePath);

    // we check if the stat is a directory if true enter the directory
    if (stat.isDirectory()) {
      if (file !== 'node_modules') {
        filePathArray = filePathArray.concat(getSvelteFiles(filePath));
      }
      // else you have reached a directory that contains no more folders to traverse, if any files in the directory contain .svelte
    } else if (path.extname(filePath) === '.svelte') {
      // push that file path into the filePathArray
      filePathArray.push(filePath);
    }
  });
  // return all .svelte file paths from application
  return filePathArray;
}
