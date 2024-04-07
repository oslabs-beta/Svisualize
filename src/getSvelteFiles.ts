import fs from 'fs';
import path from 'path';

// returns an array of svelte file uris in application. Takes in root uri as argument
export function getSvelteFiles(dir: string, justFileName: boolean = false): string[]{
  
  if (dir === undefined){
    throw new Error(`Root file not found for value '${dir}'`);
  }
  
  const files = fs.readdirSync(dir);
  let filePathArray: string[] = [];
  let stopTraversal = false;

  files.forEach((file: string) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    //only allows root +page.svelte to render
    if (stopTraversal) {return;}

    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.svelte-kit') {
        filePathArray = filePathArray.concat(getSvelteFiles(filePath, justFileName));
      }
    }
    else if (path.extname(filePath) === '.svelte') {
      if (path.basename(filePath) === '+page.svelte') {
        stopTraversal = true;
      }
      if(justFile)  {filePathArray.push(file);}
      else {filePathArray.push(filePath);}
    }
  });

  return filePathArray;
}
