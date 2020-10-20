import { ExtensionContext, commands, window } from 'vscode';
import { CheatsheetFiles as files } from './util';
import * as fs from 'fs';

export function activate(context: ExtensionContext) {
    function initGlobalCheatsheetsDirectory(){
        if (!files.isExistGlobalCheatsheetDir()) {
            try {
                fs.mkdirSync(files.getGlobalCheatsheetDirPath());
                window.showInformationMessage(`Create '.cheatsheets' directory.`);
            } catch(err) {
                window.showErrorMessage('Unexpected error has occurred.' + err);
            }
        }
        else {
            window.showWarningMessage(`The '.cheatsheets' directory already exists.`);
        }
        return;
    }

    context.subscriptions.push(commands.registerCommand(
        'my-cheatsheet.initGlobalCheatSheetsDirectory',
        initGlobalCheatsheetsDirectory
    ));
}