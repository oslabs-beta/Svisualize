"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRootContent = void 0;
const fs = require('fs');
const path = require('path');
const { getSvelteFiles } = require('./getSvelteFiles');
function getRootContent(rootPath) {
    const filePaths = getSvelteFiles(rootPath); //this will return an array of all file paths that end in .svelte
    let root; //raw code from App.svelte
    //parse through directories taken from getSvelteFiles function and find root
    filePaths.forEach((fileURI) => {
        // if filePaths contain .svelte and App.svelte
        if (path.extname(fileURI) === '.svelte' && fileURI.includes('App.svelte')) {
            // root contains the contents of App.svelte
            root = fs.readFileSync(fileURI, 'utf-8');
        }
    });
    return root;
}
exports.getRootContent = getRootContent;
//# sourceMappingURL=rootContent.js.map