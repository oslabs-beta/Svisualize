import * as vscode from 'vscode';
import { SidebarProvider } from './SidebarProvider';
import { getComponentStructure, TreeNode } from './getComponentStructure';
import { getRootContent } from './rootContent';
import { getSvelteFiles } from './getSvelteFiles';

export async function activate(context: vscode.ExtensionContext) {
  vscode.commands.executeCommand('svisualize.sendFileNames');
  let countFile = 0;
  let countActivate = 0;
  let componentStructure: TreeNode;
  let svelteFiles: string[];
  let rootPath: string;
  const folders = await vscode.workspace.workspaceFolders;
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
    vscode.commands.registerCommand('svisualize.sendUri', async (rootVal: string) => {
      if (rootVal) {
        countActivate++;
        console.log("activated: ", countActivate);
        await vscode.commands.executeCommand(
          'workbench.action.webview.reloadWebviewAction'
        );
        const rootContent: string = await getRootContent(rootPath, rootVal)!;

        componentStructure = await getComponentStructure(rootPath, rootVal, rootContent);
        sidebarProvider._view?.webview.postMessage({
          type: 'structure',
          value: componentStructure,
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
      async (chosenRoot: string) => {
          countFile++;
          console.log("file: ",countFile);
          svelteFiles = await getSvelteFiles(rootPath, true);
          sidebarProvider._view?.webview.postMessage({
            type: 'files',
            value: [svelteFiles, chosenRoot],
          });
      }
    )
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.activate', async (chosenRoot) => {
      await vscode.commands.executeCommand('svisualize.sendUri', chosenRoot);
      await vscode.commands.executeCommand('svisualize.sendFileNames', chosenRoot);
    })
  );

  context.subscriptions.push(
    vscode.commands.registerCommand('svisualize.resize', (chosenRoot) =>{
      sidebarProvider._view?.webview.postMessage({
        type: 'files',
        value: [svelteFiles, chosenRoot],
      });

      sidebarProvider._view?.webview.postMessage({
        type: 'structure',
        value: componentStructure,
      });
    })
  );
}

// This method is called when your extension is deactivated
export function deactivate() {}
