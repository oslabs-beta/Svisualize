import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { getComponentStructure } from './getComponentStructure';

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
      //console.log('folders', folders);
      // declare a constant rootPath and assign it the file paths in the specified folder
      const rootPath = folders[0].uri.fsPath;
      //console.log('root path', rootPath);
      // declare a constant result and assign it the evaluated result of invoking getComponentStructure on rootPath (which evaluates the complete component structure)
      const result = await getComponentStructure(rootPath);
      //console.log('result', result);
      // we are sending a message containing result which is our final componentStructure to Svelte
      sidebarProvider._view?.webview.postMessage({
        type: 'structure',
        value: result,
      });
    })
  );

//   // Listen for changes in the webview's view state (e.g., when it's resized)
//   sidebarProvider._view?.webview.onDidChangeViewState(event => {
//   const newPanelViewState = event.webviewPanel.visible;
//   if (newPanelViewState) {
//       // The webview is now visible, resize it as needed
//       const panelWidth = panel.webviewView.visibleColumn * vscode.window.activeTextEditor!.options.fontInfo.typicalHalfwidthCharacterWidth;
//       const panelHeight = panel.webviewView.visibleRows * vscode.window.activeTextEditor!.options.fontInfo.lineHeight;
//       resizePanel(panelWidth, panelHeight);
//   }
// });

    //function that resizes panel
 

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
