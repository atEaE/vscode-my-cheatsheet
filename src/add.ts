import { ExtensionContext, commands, workspace, window } from 'vscode';
import { CheatsheetFiles as files } from './util';
import * as path from 'path';
import * as fs from 'fs';

export function activate(context: ExtensionContext) {
    const CHOISE_WORKSPACE = 'workspace';
    const CHOISE_GLOBAL = 'global';

    function addCheatsheet() {
        Promise.resolve()
            .then(() => {
                let pickItems = [CHOISE_WORKSPACE];
                if (files.isExistGlobalCheatsheetDir()) {
                    pickItems.push(CHOISE_GLOBAL);
                }
                return window.showQuickPick(pickItems);
            })
            .then((choice) => {
                if (!choice) {
                    return;
                }

                if (CHOISE_WORKSPACE === choice) {
                    addCheatsheetToWorkspace();
                    return;
                }

                if (CHOISE_GLOBAL === choice) {
                    addCheatsheetToGlobal();
                    return;
                }
            });
    }

    async function addCheatsheetToWorkspace() {
        // check if workspace open
        if (!workspace.rootPath) {
            window.showErrorMessage('No workspace directory open');
            return;
        }

        let results = await workspace.findFiles(files.CHEATSHEET);
        if (results.length > 0) {
            window.showWarningMessage(`The '${files.CHEATSHEET}' file already exists.`);
            return;
        }
        
        let sheetPath = path.join(workspace.rootPath, files.CHEATSHEET);
        fs.writeFile(sheetPath, "", (err) => {
            if (err) {
                window.showErrorMessage('Unexpected error has occurred.' + err);
            } else {
                window.showInformationMessage(`Create 'workspace/cheatsheet'.`);
            }
        });
    }

    async function addCheatsheetToGlobal() {
        let value = await window.showInputBox();
        if (!value) {
            return;
        }

        let categoryPath = path.join(files.getGlobalCheatsheetDirPath(), value);
        if (fs.existsSync(categoryPath)) {
            window.showWarningMessage(`The '${value}' directory already exists.`);
            return;
        }

        fs.mkdir(categoryPath, (err) => {
            if (err) {
                window.showErrorMessage('Failed to create the directory.' + err);
                return;
            }

            let sheet = path.join(categoryPath, files.CHEATSHEET);

            fs.writeFile(sheet, "", (err) => {
                if (err) {
                    window.showErrorMessage('Failed to create the file.' + err);
                } else {
                    window.showInformationMessage(`Create '${value}/cheatsheet'.`);
                }
            });
        });
    }

    context.subscriptions.push(commands.registerCommand(
        'my-cheatsheet.addCheatsheet',
        addCheatsheet
    ));
}