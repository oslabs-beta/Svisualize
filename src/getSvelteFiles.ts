const fs = require('fs');
const path = require('path');

// returns an array of svelte file uris in application. Takes in root uri as argument
export function getSvelteFiles(dir: string): string[] | string {
  if (dir === '' || dir === undefined) {
    return 'no such file or directory';
  }
  const files = fs.readdirSync(dir);
  let filePathArray: string[] = [];
  let stopTraversal = false;

  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    //only allows root +page.svelte to render
    if (stopTraversal) return;

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.svelte-kit') {
        filePathArray = filePathArray.concat(getSvelteFiles(filePath));
      }
    } else if (path.basename(filePath) === '+page.svelte') {
      stopTraversal = true;
      filePathArray.push(filePath);
    } else if (path.extname(filePath) === '.svelte') {
      filePathArray.push(filePath);
    }
  });
  return filePathArray;
}
