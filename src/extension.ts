import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { getComponentStructure } from './getComponentStructure';
import { getSvelteFileNames } from './getSvelteFileNames';

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.executeCommand('svisualize.sendUri');
  vscode.commands.executeCommand('svisualize.sendFileNames');

  let rootPath : string | undefined;
  const folders = vscode.workspace.workspaceFolders;

  if(folders && folders.length > 0){
     rootPath = folders[0].uri.fsPath;
  }else {
    vscode.window.showInformationMessage('must open a workspace folder');
  }

  async function sendUri(userRoot: string = 'App.svelte'){
    console.log('uri: ', userRoot);
    if(rootPath){
      const result = await getComponentStructure(rootPath, userRoot);
      sidebarProvider._view?.webview.postMessage({
        type: 'structure',
        value: result,
      });
    }else {
      vscode.window.showInformationMessage('must open a workspace folder');
    }
  }

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'svisualize-sidebar',
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.sendUri',  () => {
      
      sendUri();

    }));

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.sendFileNames', async () => {

      if (rootPath){
        const fileNames = await getSvelteFileNames(rootPath);
        console.log('fileNames: ', fileNames);
        //the postMessage below sends a message with an array of all file names found in App that end in svelte
        sidebarProvider._view?.webview.postMessage({
          type: 'files',
          value: fileNames,
        });
      } else{
        vscode.window.showInformationMessage('must open a workspace folder');
      }
     
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.postMessage', async() => {

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
