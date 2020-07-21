import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

export namespace CheatsheetFiles {
    export const CHEATSHEET = '.cheatsheet.md'
    const CHEATSHEET_DIRECTORY = ".cheatsheet"

    export function getCheatsheetGlobalDirPath(): string {
        return path.join(os.homedir(), CHEATSHEET_DIRECTORY);
    }

    export function isExistCheatsheetGlobalDir(): boolean {
        return fs.existsSync(getCheatsheetGlobalDirPath());
    }
}