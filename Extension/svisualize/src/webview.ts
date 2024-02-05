import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
  let disposable = vscode.commands.registerCommand('extension.openWebView', () => {
      // Create and show the WebView here
  });

  context.subscriptions.push(disposable);
}
