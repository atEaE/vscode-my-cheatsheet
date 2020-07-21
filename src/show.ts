import { ExtensionContext, commands, window, workspace, Uri } from 'vscode';
import { CheatsheetFiles as files } from './util';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: ExtensionContext) {
    function openCheatsheet() {
        if (files.isExistGlobalCheatsheetDir()) {
            var result = fs.readdirSync(files.getGlobalCheatsheetDirPath());
            openCheatsheetFromGlobal(result);
        } else {
            openCheatsheetFromWorkspace()
        }
    }

    async function openCheatsheetFromGlobal(pickItem: string[]) {
        Promise.resolve()
            .then(() => {
                var pickItems = files.getGlobalCheatsheetDirs();
                return window.showQuickPick(pickItems)
            })
            .then((dir) => {
                if (!dir) {
                    return;
                }

                var sheetPath = path.join(files.getGlobalCheatsheetDirPath(), dir, files.CHEATSHEET);
                if (fs.existsSync(sheetPath)) {
                    var sheet = Uri.file(sheetPath);
                    commands.executeCommand("markdown.showPreviewToSide", sheet)
                } else {
                    window.showWarningMessage(`'${dir}/${files.CHEATSHEET}' file doesn't exist.`);
                }
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