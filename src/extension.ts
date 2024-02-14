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
    const rootPath = folders[0].uri.fsPath;
  }else {
    vscode.window.showInformationMessage('must open a workspace folder');
  }

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'svisualize-sidebar',
      sidebarProvider
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.sendUri', async () => {
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
      if(rootPath){
        const result = await getComponentStructure(rootPath);
        sidebarProvider._view?.webview.postMessage({
          type: 'structure',
          value: result,
        });
      }else {
        vscode.window.showInformationMessage('must open a workspace folder');
      }

      //if result is empty
      //send message to client to render ChooseRoot
    })
  );

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
