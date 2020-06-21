//	Imports ____________________________________________________________________

import { ChildProcessWithoutNullStreams, spawn } from 'child_process';
import * as path from 'path';
import * as vscode from 'vscode';

import { Diff, DiffFile } from '../../types';

import { lstat } from '../@l13/nodes/fse';
import { isMacOs, isWindows } from '../@l13/nodes/platforms';

import { SymlinkContentProvider } from './symlinks/SymlinkContentProvider';

//	Variables __________________________________________________________________

const findBackslashEnd = /\\$/;

//	Initialize _________________________________________________________________



//	Exports ____________________________________________________________________

export class DiffOpen {
	
	private static async openFile (file:DiffFile, openToSide:boolean) {
		
		try {
			const stat = await lstat(file.path);
			if (stat.isFile()) {
				const pathname = vscode.Uri.file(file.path);
				vscode.commands.executeCommand('vscode.open', pathname, {
					preview: false,
					viewColumn: openToSide ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active,
				});
			} else if (stat.isDirectory()) {
				//
			} else if (stat.isSymbolicLink()) {
				const pathname = SymlinkContentProvider.parse(file.path);
				vscode.commands.executeCommand('vscode.open', pathname, {
					preview: false,
					viewColumn: openToSide ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active,
				});
			} else vscode.window.showErrorMessage(`File can't be opened! '${file.path}' is not a file!`);
		} catch (error) {
			vscode.window.showErrorMessage(error.message);
		}
		
	}
	
	private static async openDiff (diff:Diff, openToSide:boolean) {
		
		try {
			const fileA:DiffFile = diff.fileA;
			const fileB:DiffFile = diff.fileB;
			const statA = await lstat(fileA.path);
			const statB = await lstat(fileB.path);
			
			if (statA.isFile() && statB.isFile()) {
				const left = vscode.Uri.file(fileA.path);
				const right = vscode.Uri.file(fileB.path);
				vscode.commands.executeCommand('vscode.diff', left, right, `${fileA.name} (${fileA.folder} ↔ ${fileB.folder})`, {
					preview: false,
					viewColumn: openToSide ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active,
				});
			} else if (statA.isDirectory() && statB.isDirectory()) {
				// const value = await DiffDialog.confirm(`Compare folder "${fileA.path}" with folder "${fileB.path}"`, 'Compare');
				// if (value) {
				// 	const left = vscode.Uri.file(fileA.path);
				// 	const right = vscode.Uri.file(fileB.path);
				// 	vscode.commands.executeCommand('l13Diff.openAndCompare', left, right, openToSide);
				// }
			} else if (statA.isSymbolicLink() && statB.isSymbolicLink()) {
				const left = SymlinkContentProvider.parse(fileA.path);
				const right = SymlinkContentProvider.parse(fileB.path);
				vscode.commands.executeCommand('vscode.diff', left, right, `${fileA.name} (${fileA.folder} ↔ ${fileB.folder})`, {
					preview: false,
					viewColumn: openToSide ? vscode.ViewColumn.Beside : vscode.ViewColumn.Active,
				});
			} else vscode.window.showErrorMessage(`Files can't be compared!`)
		} catch (error) {
			vscode.window.showErrorMessage(error.message);
		}
		
	}
	
	public static open (diff:Diff, openToSide:boolean) :void {
		
		switch (diff.status) {
			case 'deleted':
				DiffOpen.openFile(diff.fileA, openToSide);
				break;
			case 'modified':
			case 'unchanged':
				DiffOpen.openDiff(diff, openToSide);
				break;
			case 'untracked':
				DiffOpen.openFile(diff.fileB, openToSide);
				break;
		}
		
	}
	
	public static reveal (pathname:string) :void {
		
		let process:ChildProcessWithoutNullStreams = null;
		
		if (isMacOs) process = showFileInFinder(pathname);
		else if (isWindows) process = showFileInExplorer(pathname);
		else process = showFileInFolder(pathname);
		
		process.on('error', (error:Error) => {
			
			process.kill();
			vscode.window.showErrorMessage(error.message);
			
		});
		
	}
	
}

//	Functions __________________________________________________________________

function showFileInFinder (pathname:string) {
	
	return spawn('open', ['-R', pathname || '/']);
	
}

function showFileInExplorer (pathname:string) {
	
	return spawn('explorer', ['/select,', pathname.replace(findBackslashEnd, '') || 'c:\\']);
	
}

function showFileInFolder (pathname:string) {
	
	return spawn('xdg-open', [path.dirname(pathname) || '/']);
	
}