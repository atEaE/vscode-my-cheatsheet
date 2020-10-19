import { ExtensionContext, commands, window, Uri } from 'vscode';
import { CheatsheetFiles as files } from './util';
import * as fs from 'fs';

export function activate(context: ExtensionContext) {
    async function editCheatsheet() {
        const pickItems = await files.getAllCheatsheets();

        if (pickItems.length === 0) {
            window.showWarningMessage(`'${files.CHEATSHEET}' file doesn't exist.`);
            return;
        }

        Promise.resolve()
            .then(() => {
                let items = pickItems.map(i => i.name);
                return window.showQuickPick(items);
            })
            .then((choice) => {
                if (!choice) {
                    return;
                }

                const item = pickItems.find((i) => i.name === choice);
                if (!item) {
                    window.showErrorMessage(`Unexpected error has occurred.`);
                    return;
                }

                if (!item.uri) {
                    if (!fs.existsSync(item.path)) {
                        window.showWarningMessage(`'${item.path}' file doesn't exist.`);
                        return;
                    }
                    item.uri = Uri.file(item.path);
                }
                
                commands.executeCommand('vscode.open', item.uri);
            })
    }


    context.subscriptions.push(commands.registerCommand(
        'my-cheatsheet.editCheatsheet',
        editCheatsheet
    ));
}