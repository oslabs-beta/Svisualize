const fs = require('fs');
const path = require('path');

// declare a function getSvelteFiles that takes in a string that returns an array of strings
export function getSvelteFiles(dir: string): string[] | string {
  if (dir === '' || dir === undefined) {
    return 'no such file or directory';
  }
  const files = fs.readdirSync(dir);
  let filePathArray: string[] = [];

  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.svelte-kit') {
        filePathArray = filePathArray.concat(getSvelteFiles(filePath));
      }
    } else if (path.extname(filePath) === '.svelte') {
      filePathArray.push(filePath);
    }
  });
  return filePathArray;
}
