//	Imports ____________________________________________________________________

import * as vscode from 'vscode';

import * as commands from '../common/commands';
import * as dialogs from '../common/dialogs';

import { DiffMenu } from '../services/panel/DiffMenu';
import { DiffPanel } from '../services/panel/DiffPanel';
import { DiffHistory } from '../services/sidebar/DiffHistory';

//	Variables __________________________________________________________________



//	Initialize _________________________________________________________________



//	Exports ____________________________________________________________________

export function activate (context:vscode.ExtensionContext) {
	
	const diffHistoryProvider = DiffHistory.createProvider(context);
	
	vscode.window.registerTreeDataProvider('l13DiffHistory', diffHistoryProvider);
	
	commands.register(context, {
		
		'l13Diff.openComparison': ({ comparison }) => {
			
			DiffPanel.createOrShow(context, [{ fsPath: comparison.fileA }, { fsPath: comparison.fileB }], true);
			
		},
		
		'l13Diff.openComparisonOnly': ({ comparison }) => {
			
			DiffPanel.createOrShow(context, [{ fsPath: comparison.fileA }, { fsPath: comparison.fileB }], false);
			
		},
		
		'l13Diff.openComparisonAndCompare': ({ comparison }) => {
			
			DiffPanel.createOrShow(context, [{ fsPath: comparison.fileA }, { fsPath: comparison.fileB }], true);
			
		},
		
		'l13Diff.openComparisonInNewPanel': ({ comparison }) => {
			
			DiffPanel.create(context, [{ fsPath: comparison.fileA }, { fsPath: comparison.fileB }], true);
			
		},
		
		'l13Diff.removeComparison': ({ comparison }) => DiffHistory.removeComparison(context, comparison),
		
		'l13Diff.clearHistory': async () => {
			
			const value = await dialogs.confirm('Delete the complete history?', 'Delete');
			
			if (value) {
				DiffMenu.clearHistory(context);
				DiffHistory.clearComparisons(context);
			}
			
		},
	});
	
}

//	Functions __________________________________________________________________

