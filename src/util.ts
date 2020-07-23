import { ExtensionContext, commands, window, workspace, Uri } from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export namespace CheatsheetFiles {
    export const CHEATSHEET = '.cheatsheet.md'
    const CHEATSHEET_DIRECTORY = workspace.getConfiguration("mycheatsheet.extension").globalcheatsheetDirectory;

    export function getGlobalCheatsheetDirPath(): string {
        return path.join(os.homedir(), CHEATSHEET_DIRECTORY);
    }

    export function getGlobalCheatsheetDirs(): string[] {
        return fs.readdirSync(getGlobalCheatsheetDirPath());
    }

    export function isExistGlobalCheatsheetDir(): boolean {
        return fs.existsSync(getGlobalCheatsheetDirPath());
    }
}