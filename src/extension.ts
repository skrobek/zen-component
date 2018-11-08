import { commands, workspace, window, ExtensionContext } from 'vscode';
import { ZenComponent } from './zen-component';
import { getWorkspaceFolder } from './utils/workspace-util';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: ExtensionContext) {
    const workspaceRoot: string = getWorkspaceFolder(workspace.workspaceFolders);
    const generator = new ZenComponent(workspaceRoot, window);

    // The command has been defined in the package.json file
    // Now provide the implementation of the command with  registerCommand
    // The commandId parameter must match the command field in package.json
    let disposable = commands.registerCommand('extension.zenComponent', () => {
        // The code you place here will be executed every time your command is executed
        generator.execute();
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(generator);
}

// this method is called when your extension is deactivated
export function deactivate() { }