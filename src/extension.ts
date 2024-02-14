import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { getComponentStructure } from './getComponentStructure';
import { getSvelteFileNames } from './getSvelteFileNames';

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.executeCommand('svisualize.sendUri');
  vscode.commands.executeCommand('svisualize.sendFileNames');

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'svisualize-sidebar',
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.sendUri', async () => {
      const folders = vscode.workspace.workspaceFolders;
      // declare a constant rootPath and assign it the file paths in the specified folder
      const rootPath = folders[0].uri.fsPath;
      // console.log('root path', rootPath);
      // declare a constant result and assign it the evaluated result of invoking getComponentStructure on rootPath (which evaluates the complete component structure)
      const result = await getComponentStructure(rootPath);

      sidebarProvider._view?.webview.postMessage({
        type: 'structure',
        value: result,
      });

      //if result is empty
      //send message to client to render ChooseRoot
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.sendFileNames', async () => {
      const folders = vscode.workspace.workspaceFolders;
      const rootPath = folders[0].uri.fsPath;
      const fileNames = await getSvelteFileNames(rootPath);
      console.log('fileNames: ', fileNames);
      //the postMessage below sends a message with an array of all file names found in App that end in svelte
      sidebarProvider._view?.webview.postMessage({
        type: 'files',
        value: fileNames,
      });
    })
  );
}

//declare a function that renders webview content. render an html file
function getWebviewContent(filePath: string): string {
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
export function deactivate() {}
