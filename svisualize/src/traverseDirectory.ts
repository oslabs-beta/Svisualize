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
      if (file === 'App.svelte') {
        const data = fs.readFileSync(filePath, 'utf-8');
        console.log(data);
      }
    }
  });
}

//stretch goal: we need to add additional filters on line 19 in case their root directory is not named App.svelte
