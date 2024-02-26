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

  // command to generate component structure.
  // passes application's uri as an argument to getComponentStructure and sends results to front-end
  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.sendUri', async (rootVal) => {
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

  // command to gather all svelte file names in application. Used to send file names to front-end
  context.subscriptions.push(
    vscode.commands.registerCommand(
      'svisualize.sendFileNames',
      async (chosenRoot) => {
        if (rootPath) {
          const fileNames = await getSvelteFileNames(rootPath);
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

// This method is called when your extension is deactivated
export function deactivate() {}
