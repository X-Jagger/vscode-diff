//	Imports ____________________________________________________________________

import * as vscode from 'vscode';

import * as commands from '../common/commands';

import { DiffOutput } from '../services/output/DiffOutput';

//	Variables __________________________________________________________________



//	Initialize _________________________________________________________________



//	Exports ____________________________________________________________________

export function activate (context:vscode.ExtensionContext) {
	
	commands.register(context, {
		'l13Diff.showOutput': () => DiffOutput.currentOutput?.show(),
	});
	
}

//	Functions __________________________________________________________________

