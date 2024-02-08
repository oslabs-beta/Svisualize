const fs = require('fs');
// const svelte = require('svelte/compiler');
// const { parse } = require('svelte/compiler');
const path = require('path');
const { traverseDirectory } = require('./traverseDirectory');

// will use fs.readfilesync to check if there are any import statments
// create a abstract syntax tree to parse svelte file
// traverse ast to find children of component
// push children to array and return result
export function parseFile(rootPath: string) {
  //   fs.readFile(
  //     './Jason-Caleb-parsing-test/demo-components2.0/App.svelte',
  //     'utf-8',
  //     (err, source) => {
  //       if (err) {
  //         console.error('Error reading Svelte source file:', err);
  //         return;
  //       }
  //       // Parse the Svelte source code
  //       // const ast = parse(source);
  //       // Define route handler to send the parsed AST
  //       let correctPath;

  const filePaths = traverseDirectory(rootPath); //this will return an array of all file paths that end in .svelte
  let root; //raw code from App.svelte

  //parse through directories taken from traverDirectory function and find r
  filePaths.forEach((fileURI: string) => {
    if (path.extname(fileURI) === '.svelte' && fileURI.includes('App.svelte')) {
      root = fs.readFileSync(fileURI, 'utf-8');
    }
  });

  // let sourceString = JSON.stringify(source);
  // const children = [];
  // function parseFunc(string) {
  //   let words = sourceString
  //     .split(/[ ;'"]+/)
  //     .filter((word) => word.trim() !== '');
  //   for (let i = 0; i < words.length; i++) {
  //     if (words[i] === 'import') {
  //       children.push(words[i + 1]);
  //       for (let j = 0; j < filePaths.length; j++) {
  //         if (filePaths[j].includes(words[i + 3])) {
  //           const correctPath = filePaths[j];
  //           fs.readFile(correctPath, 'utf-8', (err, source) => {
  //             if (err) {
  //               console.error('Error reading Svelte source file:', err);
  //               return;
  //             }
  //             let newSourceString = JSON.stringify(source);
  //             //children.push(words[i + 1]);
  //             //console.log(children);
  //             // Consider if you really need recursion here
  //             // return parseFunc(newSourceString);
  //           });
  //         }
  //       }
  //     }
  //   }
  // }
  // parseFunc(sourceString);
  // //console.log(words);
  //     }
  //   );
}
