import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export namespace CheatsheetFiles {
    export const CHEATSHEET = '.cheatsheet.md'
    const CHEATSHEET_DIRECTORY = ".cheatsheet"

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