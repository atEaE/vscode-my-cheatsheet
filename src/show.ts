import { ExtensionContext, commands, window, workspace } from 'vscode';

export function activate(context: ExtensionContext) {
    const CHEATSHEET = '.cheatsheet.md'

    async function openCheatsheet() {
        var files = await workspace.findFiles(CHEATSHEET);
        if (files.length > 0) {
            commands.executeCommand("markdown.showPreviewToSide", files[0])
        } else {
            window.showWarningMessage(`'${CHEATSHEET}' file doesn't exist.`);
        }
    }
    
    context.subscriptions.push(commands.registerCommand(
        'my-cheatsheet.showCheatsheetToSide',
        openCheatsheet
    ))
}