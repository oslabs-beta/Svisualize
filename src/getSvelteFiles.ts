import fs from 'fs';
import path from 'path';

// returns an array of svelte file uris in application. Takes in root uri as argument
export function getSvelteFiles(dir: string): string[]{
  
  if (dir === undefined){
    throw new Error(`Root file not found for value '${dir}'`);
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
