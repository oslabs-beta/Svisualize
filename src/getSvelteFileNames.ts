const fs = require('fs');
const path = require('path');

// returns an array of all svelte file names; used for dropdown functionality
export function getSvelteFileNames(dir: string): string[] {
  const files = fs.readdirSync(dir);
  let fileNames: string[] = [];

  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.svelte-kit') {
        fileNames = fileNames.concat(getSvelteFileNames(filePath));
      }
    } else if (path.extname(filePath) === '.svelte') {
      fileNames.push(file);
    }
  });
  return fileNames;
}
