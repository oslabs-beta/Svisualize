const fs = require('fs');
const path = require('path');

export function traverseDirectory(dir: string): string[] {
  const files = fs.readdirSync(dir);
  let filePathArray: string[] = [];

  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules') {
        filePathArray = filePathArray.concat(traverseDirectory(filePath));
      }
    } else if (path.extname(filePath) === '.svelte') {
      filePathArray.push(filePath);
    }
  });
  return filePathArray;
}
