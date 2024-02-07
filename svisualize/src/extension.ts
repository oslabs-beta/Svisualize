// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
const path = require('path');


// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "svisualize" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	context.subscriptions.push(vscode.commands.registerCommand('svisualize.helloWorld', () => {
		// The code you place here will be executed every time your command is executed
		// Display a message box to the user
		vscode.window.showInformationMessage('Hello World from Svisualize!');
	}));

	//create a command to render d3 tree in webview
	context.subscriptions.push(vscode.commands.registerCommand('svisualize.render', async () => {
		//show a message on render that asks users to insert file path of tree root
		const rootPath = await vscode.window.showInformationMessage("Enter File Path of Tree Root", "Entered");

		if (rootPath === 'Entered'){
			const panel = vscode.window.createWebviewPanel(
				'svisualize',
				'Svisualize',
				vscode.ViewColumn.One,
				{
					//enable js scripts in webview
					enableScripts: true
				}
			);

				//grab extensionId from package.json
			// const extensionId = require('../package.json').name;
			
			//retrieve path of demo file from demo.js
			const scriptPath = vscode.Uri.file(path.join(__dirname, 'demo.js'));
			//change script path to webviewuri
			const scriptUri = panel.webview.asWebviewUri(scriptPath);
			const demoJS = `<script src="${scriptUri}"></script>`;
			console.log('demo script', demoJS);

			console.log('inside webview');
			panel.webview.html = getWebviewContent(demoJS);
		}

	}));

}






//declare a function that renders webview content. render an html file
function getWebviewContent(filePath:string): string{
	return `<!DOCTYPE html>
	<html lang="en">
	<head>
			<meta charset="UTF-8">
			<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<title>Svisualize</title>
	</head>
	<body>
			<div id="d3-content">
				${filePath}
				<h1>SVISUALIZE</h1>
			</div>
	</body>
	</html>`;
}

// This method is called when your extension is deactivated
export function deactivate() {}
