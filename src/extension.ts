import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { getComponentStructure } from './getComponentStructure';
import { getSvelteFileNames } from './getSvelteFileNames';
import { getRootContent } from './rootContent';

export async function activate(context: vscode.ExtensionContext) {
  vscode.commands.executeCommand('svisualize.sendFileNames');

  let rootPath: string;
  const folders = vscode.workspace.workspaceFolders;
  if (folders && folders.length > 0) {
    rootPath = folders[0].uri.fsPath;
  } else {
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
    vscode.commands.registerCommand('svisualize.sendUri', async (rootVal) => {
      
      // declare a constant result and assign it the evaluated result of invoking getComponentStructure on rootPath (which evaluates the complete component structure)
      //create an edge case if rootPath returns undefined
      if (rootVal) {
        await vscode.commands.executeCommand(
          'workbench.action.webview.reloadWebviewAction'
        );
        const root: string = await getRootContent(rootPath, rootVal)!;

        const result = await getComponentStructure(rootPath, rootVal, root);
        sidebarProvider._view?.webview.postMessage({
          type: 'structure',
          value: result,
        });
      } else {
        vscode.window.showInformationMessage(
          'Select your root in the dropdown'
        );
      }
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand(
      'svisualize.sendFileNames',
      async (chosenRoot) => {
        if (rootPath) {
          const fileNames = await getSvelteFileNames(rootPath);
          //the postMessage below sends a message with an array of all file names found in App that end in svelte
          sidebarProvider._view?.webview.postMessage({
            type: 'files',
            value: [fileNames, chosenRoot],
          });
        } else {
          vscode.window.showInformationMessage('must open a workspace folder');
        }
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.activate', async (rootVal) => {
      await vscode.commands.executeCommand('svisualize.sendUri', rootVal);
      await vscode.commands.executeCommand('svisualize.sendFileNames', rootVal);
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
