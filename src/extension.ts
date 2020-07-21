import { ExtensionContext } from 'vscode';
import * as showExt from './show';

export function activate(context: ExtensionContext) {
	activateMyCheatSheet(context);
}

function activateMyCheatSheet(context: ExtensionContext) {
	// Cheatsheet show
	showExt.activate(context);
}

export function deactivate() {}
