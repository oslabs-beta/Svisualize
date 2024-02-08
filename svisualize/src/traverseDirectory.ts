const fs = require('fs');
const path = require('path');

export function traverseDirectory(dir: string) {
  const files = fs.readdirSync(dir);

  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat.isDirectory()) {
      if (file !== 'node_modules') {
        traverseDirectory(filePath);
      }
    } else if (path.extname(filePath) === '.svelte') {
      console.log(filePath);
      console.log(file);
      if (file === 'App.svelte') {
        console.log('found it');
        const data = fs.readFileSync(filePath, 'utf-8');
        console.log(data);
      }
    }
  });
}
