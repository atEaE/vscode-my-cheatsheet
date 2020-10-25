import { workspace } from 'vscode';
import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';
import { CheatSheet } from './@types/cheatsheet';

export namespace CheatsheetFiles {
    export const CHEATSHEET = '.cheatsheet.md';
    const CHEATSHEET_DIRECTORY = workspace.getConfiguration("mycheatsheet.extension").globalcheatsheetDirectory;

    export function getGlobalCheatsheetDirPath(): string {
        return path.join(os.homedir(), CHEATSHEET_DIRECTORY);
    }

    export function getGlobalCheatsheetDirs(): string[] {
        // ignore git repo
        let dirs = fs.readdirSync(getGlobalCheatsheetDirPath()).filter(d => d !== ".git");
        return dirs
    }

    export async function getAllCheatsheets(): Promise<CheatSheet[]> {
        const pickItems: CheatSheet[] = [];
        let results = await workspace.findFiles(CHEATSHEET);
        if (results.length > 0) {
            pickItems.push({
                name: ".cheatsheet (workspace)",
                path: results[0].path,
                uri: results[0]
            });
        }

        if (isExistGlobalCheatsheetDir()) {
            let dirs = getGlobalCheatsheetDirs();
            dirs.forEach(dir => {
                pickItems.push({
                    name: dir,
                    path: path.join(getGlobalCheatsheetDirPath(), dir, CHEATSHEET)
                });
            });
        }
        return pickItems;
    }

    export function isExistGlobalCheatsheetDir(): boolean {
        return fs.existsSync(getGlobalCheatsheetDirPath());
    }
}