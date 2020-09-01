import { ExtensionContext, commands, window, workspace, Uri } from 'vscode';
import { CheatsheetFiles as files } from './util';
import { CheatSheet } from './@types/cheatsheet';
import * as fs from 'fs';
import * as path from 'path';

export function activate(context: ExtensionContext) {
    async function openCheatsheet() {
        const pickItems: CheatSheet[] = [];
        let results = await workspace.findFiles(files.CHEATSHEET);
        if (results.length > 0) {
            pickItems.push({
                name: ".cheatsheet (workspace)",
                path: results[0].path,
                uri: results[0]
            });
        }

        if (files.isExistGlobalCheatsheetDir()) {
            let dirs = files.getGlobalCheatsheetDirs()
            dirs.forEach(dir => {
                pickItems.push({
                    name: dir,
                    path: path.join(files.getGlobalCheatsheetDirPath(), dir, files.CHEATSHEET)
                });
            })
        }

        if (pickItems.length === 0) {
            window.showWarningMessage(`'${files.CHEATSHEET}' file doesn't exist.`);
            return;
        }

        Promise.resolve()
            .then(() => {
                let items = pickItems.map(i => {return i.name});
                return window.showQuickPick(items);
            })
            .then((dir) => {
                if (!dir) {
                    window.showErrorMessage(`Unexpected error has occurred.`);
                    return;
                }

                const item = pickItems.find((i) => i.name === dir);
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
                
                commands.executeCommand("markdown.showPreviewToSide", item.uri);
            })
    }
        
    context.subscriptions.push(commands.registerCommand(
        'my-cheatsheet.showCheatsheetToSide',
        openCheatsheet
    ))
}