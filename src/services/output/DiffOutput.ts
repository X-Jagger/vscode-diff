//	Imports ____________________________________________________________________

import * as vscode from 'vscode';

import { remove } from '../../@l13/arrays';

//	Variables __________________________________________________________________



//	Initialize _________________________________________________________________



//	Exports ____________________________________________________________________

export class DiffOutput {
	
	private static output:vscode.OutputChannel|undefined;
	
	public static currentOutput:DiffOutput|undefined;
	
	private static outputs:DiffOutput[] = [];
	
	private lines:string[] = [];
	
	public constructor () {
		
		if (!DiffOutput.output) {
			DiffOutput.output = vscode.window.createOutputChannel('Diff Folders');
		}
		
		DiffOutput.currentOutput = this;
		DiffOutput.outputs.push(this);
		
		this.clear();
		
	}
	
	public activate () {
		
		if (DiffOutput.currentOutput !== this) {
			DiffOutput.currentOutput = this;
			DiffOutput.output.clear();
			this.lines.forEach((line) => DiffOutput.output.appendLine(line));
		}
		
	}
	
	public log (text:string) :void {
		
		this.msg(`[${createTimestamp()}] ${text}`);
		
	}
	
	public msg (line:string = '') :void {
		
		this.lines.push(line);
		
		if (DiffOutput.currentOutput === this) DiffOutput.output.appendLine(line);
		
	}
	
	public show () :void {
		
		if (DiffOutput.currentOutput === this) DiffOutput.output.show();
		
	}
	
	public hide () :void {
		
		if (DiffOutput.currentOutput === this) DiffOutput.output.hide();
		
	}
	
	public clear () :void {
		
		this.lines = [];
		
		if (DiffOutput.currentOutput === this) DiffOutput.output.clear();
		
	}
	
	public dispose () :void {
		
		remove(DiffOutput.outputs, this);
		
		if (!DiffOutput.outputs.length && DiffOutput.output) {
			DiffOutput.output.clear(); // Fixes uncleared output panel
			DiffOutput.output.dispose();
			DiffOutput.output = undefined;
		}
		
	}
	
}

//	Functions __________________________________________________________________

function createTimestamp () {
	
	const now = new Date();
	const hours = '' + now.getHours();
	const minutes = '' + now.getMinutes();
	const seconds = '' + now.getSeconds();
	
	return `${padStart(hours, 2, '0')}:${padStart(minutes, 2, '0')}:${padStart(seconds, 2, '0')}`;
	
}

function padStart (str:string, length:number, pad:string) {
	
	while (str.length < length) str = pad + str;
	
	return str;
	
}