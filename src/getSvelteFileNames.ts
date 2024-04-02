const fs = require('fs');
const path = require('path');

// returns an array of all svelte file names; used for dropdown functionality
export function getSvelteFileNames(dir: string): string[] {
  const files = fs.readdirSync(dir);
  let fileNames: string[] = [];
  let stopTraversal = false;

  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    //prevents multi-page svelte applications from getting rendered into dropdown
    if (stopTraversal) return;

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.svelte-kit') {
        fileNames = fileNames.concat(getSvelteFileNames(filePath));
      }
    } else if (path.basename(filePath) === '+page.svelte') {
      stopTraversal = true;
      fileNames.push(file);
    } else if (path.extname(filePath) === '.svelte') {
      fileNames.push(file);
    }
  });
  return fileNames;
}
