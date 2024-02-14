"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
const vscode = __importStar(require("vscode"));
const SidebarProvider_1 = require("./SidebarProvider");
const getComponentStructure_1 = require("./getComponentStructure");
const getSvelteFileNames_1 = require("./getSvelteFileNames");
function activate(context) {
    vscode.commands.executeCommand('svisualize.sendUri');
    vscode.commands.executeCommand('svisualize.sendFileNames');
    let rootPath;
    const folders = vscode.workspace.workspaceFolders;
    if (folders && folders.length > 0) {
        const rootPath = folders[0].uri.fsPath;
    }
    else {
        vscode.window.showInformationMessage('must open a workspace folder');
    }
    const sidebarProvider = new SidebarProvider_1.SidebarProvider(context.extensionUri);
    context.subscriptions.push(vscode.window.registerWebviewViewProvider('svisualize-sidebar', sidebarProvider));
    context.subscriptions.push(vscode.commands.registerCommand('svisualize.sendUri', async () => {
        /*
        if (folders && folders.length > 0) {
      const rootPath = folders[0].uri.fsPath;
      // Now you can safely use rootPath
  } else {
      // Handle the case when folders array is undefined or empty
  }
        */
        const folders = vscode.workspace.workspaceFolders;
        // declare a constant rootPath and assign it the file paths in the specified folder
        // const rootPath = folders ? folders[0].uri.fsPath: vscode.window.showInformationMessage('must open a workspace folder') ;
        // console.log('root path', rootPath);
        // declare a constant result and assign it the evaluated result of invoking getComponentStructure on rootPath (which evaluates the complete component structure)
        //create an edge case if rootPath returns undefined
        if (rootPath) {
            const result = await (0, getComponentStructure_1.getComponentStructure)(rootPath);
            sidebarProvider._view?.webview.postMessage({
                type: 'structure',
                value: result,
            });
        }
        else {
            vscode.window.showInformationMessage('must open a workspace folder');
        }
        //if result is empty
        //send message to client to render ChooseRoot
    }));
    context.subscriptions.push(vscode.commands.registerCommand('svisualize.sendFileNames', async () => {
        if (rootPath) {
            const fileNames = await (0, getSvelteFileNames_1.getSvelteFileNames)(rootPath);
            console.log('fileNames: ', fileNames);
            //the postMessage below sends a message with an array of all file names found in App that end in svelte
            sidebarProvider._view?.webview.postMessage({
                type: 'files',
                value: fileNames,
            });
        }
        else {
            vscode.window.showInformationMessage('must open a workspace folder');
        }
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
//# sourceMappingURL=extension.js.map