/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ([
/* 0 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(__webpack_require__(1));
const SidebarProvider_1 = __webpack_require__(2);
const parseFile_1 = __webpack_require__(4);
function activate(context) {
    vscode.commands.executeCommand('svisualize.sendUri');
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('svisualize-sidebar', sidebarProvider));
    // context.subscriptions.push(
    //   vscode.commands.registerCommand('svisualize.refresh', async () => {
    //     await vscode.commands.executeCommand('workbench.action.closeSidebar');
    //     await vscode.commands.executeCommand(
    //       'workbench.view.extension.svisualize-sidebar-view'
    //     );
    //     setTimeout(() => {
    //       vscode.commands.executeCommand(
    //         'workbench.action.webview.openDeveloperTools'
    //       );
    //     }, 500);
    //   })
    // );
    context.subscriptions.push(vscode.commands.registerCommand('svisualize.sendUri', async () => {
        const folders = vscode.workspace.workspaceFolders;
        const rootPath = folders[0].uri.fsPath;
        const result = await (0, parseFile_1.parseFile)(rootPath);
        console.log(result);
        //we are sending a message containing result which is our final componentStructure to Svelte
        sidebarProvider._view?.webview.postMessage({
            type: 'structure',
            value: result,
        });
    }));
}
exports.activate = activate;
//declare a function that renders webview content. render an html file
function getWebviewContent(filePath) {
    return `<!DOCTYPE html>
	<html lang="en">
	<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Svisualize</title>
	</head>
	<body>
				${filePath}
	</body>
	</html>`;
}
// This method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;


/***/ }),
/* 1 */
/***/ ((module) => {

module.exports = require("vscode");

/***/ }),
/* 2 */
/***/ (function(__unused_webpack_module, exports, __webpack_require__) {


var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.SidebarProvider = void 0;
const vscode = __importStar(__webpack_require__(1));
const getNonce_1 = __webpack_require__(3);
class SidebarProvider {
    _extensionUri;
    _view;
    _doc;
    constructor(_extensionUri) {
        this._extensionUri = _extensionUri;
    }
    resolveWebviewView(webviewView) {
        this._view = webviewView;
        webviewView.webview.options = {
            // Allow scripts in the webview
            enableScripts: true,
            localResourceRoots: [this._extensionUri],
        };
        webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);
        webviewView.webview.onDidReceiveMessage(async (data) => {
            switch (data.type) {
                case 'onInfo': {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showInformationMessage(data.value);
                    break;
                }
                case 'onError': {
                    if (!data.value) {
                        return;
                    }
                    vscode.window.showErrorMessage(data.value);
                    break;
                }
            }
        });
    }
    revive(panel) {
        this._view = panel;
    }
    _getHtmlForWebview(webview) {
        const scriptUri = webview.asWebviewUri(vscode.Uri.joinPath(this._extensionUri, 'dist', 'sidebar.js'));
        // Use a nonce to only allow a specific script to be run.
        const nonce = (0, getNonce_1.getNonce)();
        return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script nonce = "${nonce}">
          const tsvscode = acquireVsCodeApi();
        </script>
			</head>
      <body>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
    }
}
exports.SidebarProvider = SidebarProvider;


/***/ }),
/* 3 */
/***/ ((__unused_webpack_module, exports) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.getNonce = void 0;
function getNonce() {
    let text = '';
    const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < 32; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}
exports.getNonce = getNonce;


/***/ }),
/* 4 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.parseFile = void 0;
const fs = __webpack_require__(5);
const path = __webpack_require__(6);
const { traverseDirectory } = __webpack_require__(7);
function parseFile(rootPath) {
    const filePaths = traverseDirectory(rootPath); //this will return an array of all file paths that end in .svelte
    let root; //raw code from App.svelte
    //parse through directories taken from traverDirectory function and find root
    filePaths.forEach((fileURI) => {
        if (path.extname(fileURI) === '.svelte' && fileURI.includes('App.svelte')) {
            root = fs.readFileSync(fileURI, 'utf-8');
        }
    });
    // Define a class
    class TreeNode {
        name;
        children;
        constructor(name) {
            this.name = name;
            this.children = [];
        }
    }
    const componentStructure = new TreeNode('App');
    let correctPath;
    let rootString = JSON.stringify(root);
    function getFilePaths(rootPath) { }
    function parseFunc(fileContents = rootString, currTree = componentStructure) {
        //only parse through text within script tags
        let invoked = 0;
        for (let i = 0; i < fileContents.length; i++) {
            //if </script
            if (fileContents[i] === '<') {
                if (fileContents[i + 1] === '/') {
                    if (fileContents[i + 2] === 's') {
                        fileContents = fileContents.slice(0, i + 9);
                        break;
                    }
                }
            }
            //splice after script
        }
        //split file contents' into an array
        const fileContentsArr = fileContents
            .split(/[ ;'"]+/)
            .filter((word) => word.trim() !== '');
        for (let i = 0; i < fileContentsArr.length; i++) {
            //stop loop if file content text are outside of script tags
            if (fileContentsArr[i] === 'import') {
                //create a new instance of treeNode representing the new child
                const newTreeNode = new TreeNode(fileContentsArr[i + 1]);
                //declare a var to grab path [i + 3]
                currTree.children.push(newTreeNode);
                for (let j = 0; j < filePaths.length; j++) {
                    if (filePaths[j].includes(fileContentsArr[i + 3])) {
                        const correctPath = filePaths[j];
                        const childData = fs.readFileSync(correctPath, 'utf-8');
                        let newSourceString = JSON.stringify(childData);
                        parseFunc(newSourceString, newTreeNode);
                    }
                }
            }
        }
    }
    parseFunc();
    console.log(componentStructure);
    return componentStructure;
}
exports.parseFile = parseFile;


/***/ }),
/* 5 */
/***/ ((module) => {

module.exports = require("fs");

/***/ }),
/* 6 */
/***/ ((module) => {

module.exports = require("path");

/***/ }),
/* 7 */
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {


Object.defineProperty(exports, "__esModule", ({ value: true }));
exports.traverseDirectory = void 0;
const fs = __webpack_require__(5);
const path = __webpack_require__(6);
function traverseDirectory(dir) {
    const files = fs.readdirSync(dir);
    let filePathArray = [];
    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);
        if (stat.isDirectory()) {
            if (file !== 'node_modules') {
                filePathArray = filePathArray.concat(traverseDirectory(filePath));
            }
        }
        else if (path.extname(filePath) === '.svelte') {
            filePathArray.push(filePath);
        }
    });
    return filePathArray;
}
exports.traverseDirectory = traverseDirectory;


/***/ })
/******/ 	]);
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__(0);
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;
//# sourceMappingURL=extension.js.map