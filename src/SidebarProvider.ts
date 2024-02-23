import * as vscode from 'vscode';
import { getNonce } from './getNonce';
// import { getRootValue } from './getRootValue';

export class SidebarProvider implements vscode.WebviewViewProvider {
  _view?: vscode.WebviewView;
  _doc?: vscode.TextDocument;
  private _dataValue: any = null;

  constructor(private readonly _extensionUri: vscode.Uri) {}

  public resolveWebviewView(webviewView: vscode.WebviewView) {
    this._view = webviewView;

    webviewView.webview.options = {
      // Allow scripts in the webview
      enableScripts: true,
      localResourceRoots: [this._extensionUri],
    };

    webviewView.webview.html = this._getHtmlForWebview(webviewView.webview);

    webviewView.onDidChangeVisibility((e) => {
      vscode.commands.executeCommand(
        'workbench.action.webview.reloadWebviewAction'
      );
      vscode.commands.executeCommand('svisualize.sendFileNames');
    });

    webviewView.webview.onDidReceiveMessage(async (data) => {
      switch (data.type) {
        case 'render': {
          if (!data.value) {
            return;
          }
          await vscode.commands.executeCommand(
            'workbench.action.webview.reloadWebviewAction'
          );
          vscode.commands.executeCommand('svisualize.sendUri');
          vscode.commands.executeCommand('svisualize.sendFileNames');
          break;
        }
        case 'selection': {
          if (!data.value) {
            return;
          }
          await vscode.commands.executeCommand(
            'workbench.action.webview.reloadWebviewAction'
          );
          const rootVal = data.value;
          vscode.commands.executeCommand('svisualize.sendUri', rootVal);
          vscode.commands.executeCommand('svisualize.sendFileNames');
          break;
        }
        case 'uri': {
          if (!data.value) {
            return;
          }
          const vscodeUri = vscode.Uri.file(data.value);
          vscode.workspace.openTextDocument(vscodeUri).then((document) => {
            vscode.window.showTextDocument(document);
          });
          break;
        }
      }
    });
  }

  public revive(panel: vscode.WebviewView) {
    this._view = panel;
  }

  private _getHtmlForWebview(webview: vscode.Webview) {
    const scriptUri = webview.asWebviewUri(
      vscode.Uri.joinPath(this._extensionUri, 'dist', 'sidebar.js')
    );

    // Use a nonce to only allow a specific script to be run.
    const nonce = getNonce();

    return `<!DOCTYPE html>
			<html lang="en">
			<head>
				<meta charset="UTF-8">
				<!--
					Use a content security policy to only allow loading images from https or from our extension directory,
					and only allow scripts that have a specific nonce.
        -->
        <meta http-equiv="Content-Security-Policy" content="img-src https: data:; style-src 'unsafe-inline' ${webview.cspSource}; script-src 'nonce-${nonce}';">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script nonce = "${nonce}">
          const tsvscode = acquireVsCodeApi();
        </script>
			</head>
      <body>
				<script nonce="${nonce}" src="${scriptUri}"></script>
			</body>
			</html>`;
  }
  public get dataValue(): any {
    return this._dataValue;
  }
}
