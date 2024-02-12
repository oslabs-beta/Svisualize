import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { parseFile } from './parseFile';
import { getComponentStructure } from './componentStructure';

export function activate(context: vscode.ExtensionContext) {
  vscode.commands.executeCommand('svisualize.sendUri');

  const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      'svisualize-sidebar',
      sidebarProvider
    )
  );


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

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.sendUri', async () => {
      const folders = vscode.workspace.workspaceFolders;
      const rootPath = folders[0].uri.fsPath;
      const result = await parseFile(rootPath);
      console.log(result);
      //we are sending a message containing result which is our final componentStructure to Svelte
      sidebarProvider._view?.webview.postMessage({
        type: 'structure',
        value: result,
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
