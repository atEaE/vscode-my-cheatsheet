import { ExtensionContext, commands, workspace, window } from 'vscode';
import { CheatsheetFiles as files } from './util';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: ExtensionContext) {
    async function addCheatsheet() {
        // check if workspace open
        if (!workspace.rootPath) {
            window.showErrorMessage('No workspace directory open');
            return;
        }

        let results = await workspace.findFiles(files.CHEATSHEET);
        if (results.length > 0) {
            window.showWarningMessage(`The '${files.CHEATSHEET}' file already exists.`)
            return;
        }
        
        let sheetPath = path.join(workspace.rootPath, files.CHEATSHEET);
        fs.writeFile(sheetPath, "", (err) => {
            if (err) {
                window.showErrorMessage('Unexpected error has occurred.' + err);
            } else {
                window.showInformationMessage(`Create '${files.CHEATSHEET}'!!`);
            }
        })
    }

    context.subscriptions.push(commands.registerCommand(
        'my-cheatsheet.addCheatsheet',
        addCheatsheet
    ));
}