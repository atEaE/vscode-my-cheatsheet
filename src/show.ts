import { ExtensionContext, commands, window, workspace, Uri } from 'vscode';
import { CheatsheetFiles as files } from './util';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: ExtensionContext) {
    function openCheatsheet() {
        if (files.isExistCheatsheetGlobalDir()) {
            var result = fs.readdirSync(files.getCheatsheetGlobalDirPath());
            openCheatsheetFromGlobal(result);
        } else {
            openCheatsheetFromWorkspace()
        }
    }

    async function openCheatsheetFromGlobal(pickItem: string[]) {
        Promise.resolve()
            .then(() => {
                return window.showQuickPick(pickItem)
            })
            .then((file) => {
                if (!file) {
                    // TODO : error handling
                    return;
                }

                var sheetPath = path.join(files.getCheatsheetGlobalDirPath(), file, files.CHEATSHEET);
                console.log(sheetPath);
                var sheet = Uri.file(sheetPath)
                commands.executeCommand("markdown.showPreviewToSide", sheet)
            })
    }

    async function openCheatsheetFromWorkspace() {
        var sheets = await workspace.findFiles(files.CHEATSHEET);
        if (sheets.length > 0) {
            commands.executeCommand("markdown.showPreviewToSide", sheets[0])
        } else {
            window.showWarningMessage(`'${files.CHEATSHEET}' file doesn't exist.`);
        }
    }
    
    context.subscriptions.push(commands.registerCommand(
        'my-cheatsheet.showCheatsheetToSide',
        openCheatsheet
    ))
}