import { ExtensionContext } from 'vscode';
import * as addExt from './add';
import * as editExt from './edit';
import * as showExt from './show';
import * as initGlobalExt from './init_global';

export function activate(context: ExtensionContext) {
	activateMyCheatSheet(context);
}

function activateMyCheatSheet(context: ExtensionContext) {
	// Show cheatsheet
	showExt.activate(context);
	// Add cheatsheet
	addExt.activate(context);
	// Edit cheatsheet
	editExt.activate(context);
	// Init GlobalCheatsheetsDirectory
	initGlobalExt.activate(context);
}

export function deactivate() {}
