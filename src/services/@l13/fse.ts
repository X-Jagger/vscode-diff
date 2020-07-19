//	Imports ____________________________________________________________________

import * as fs from 'fs';
import * as path from 'path';

import { Callback, WalkTreeJob, WalkTreeOptions } from '../../types';

//	Variables __________________________________________________________________

const findRegExpChars:RegExp = /([\\\[\]\.\*\^\$\|\+\-\{\}\(\)\?\!\=\:\,])/g;
const sep = path.sep;

//	Initialize _________________________________________________________________



//	Exports ____________________________________________________________________

export function copyFile (sourcePath:string, destPath:string, options?:any, callback?:any) {
	
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	
	destPath = path.resolve(sourcePath, destPath);
	
	const dirname = path.dirname(destPath);
	
	if (!fs.existsSync(dirname)) mkdirsSync(dirname);
	
	_copyFile(sourcePath, destPath, callback);
	
}

export function walkTree (cwd:string, options:Callback|WalkTreeOptions, callback?:Callback) {
	
	callback = typeof options === 'function' ? options : callback;
	
	const findIgnore = Array.isArray((<WalkTreeOptions>options).ignore) ? createFindGlob((<string[]>(<WalkTreeOptions>options).ignore)) : null;
	
	const job:WalkTreeJob = {
		error: null,
		ignore: findIgnore,
		result: {},
		tasks: 1,
		done: (error?:Error) => {
			
			if (error) {
				job.error = error;
				(<Callback>callback)(error);
			} else (<Callback>callback)(null, job.result);
			
		},
	};
	
	_walktree(job, cwd);
	
}

export function walkUp (dirname:string, filename:string) :string {
	
	return dirname.split(path.sep).some(() => {
		
		if (fs.existsSync(path.join(dirname, filename))) return true;
		
		dirname = path.dirname(dirname);
		return false;
		
	}) ? path.join(dirname, filename) : null;
	
}

// export function unlinkSync (pathname:string) :number {
	
// 	const stat = lstatSync(pathname);
// 	let total = 0;
	
// 	if (stat) {
// 		if (stat.isDirectory()) {
// 			fs.readdirSync(pathname).forEach((name) => total += unlinkSync(path.join(pathname, name)));
// 			fs.rmdirSync(pathname);
// 			total++;
// 		} else if (stat.isFile() || stat.isSymbolicLink()) {
// 			fs.unlinkSync(pathname);
// 			total++;
// 		}
// 	}
	
// 	return total;
	
// }

export function lstatSync (pathname:string) {
	
	try {
		return fs.lstatSync(pathname);
	} catch (error) {
		return null;
	}
	
}

export function lstat (pathname:string) :Promise<fs.Stats> {
	
	return new Promise((resolve, reject) => {
		
		fs.lstat(pathname, (error, stat) => {
			
			if (error) reject(error);
			else resolve(stat);
			
		});
		
	});
	
}

export function createFindGlob (ignore:string[]) {
	
	return new RegExp(`^(${ignore.map((value) => escapeForRegExp(value)).join('|')})$`);
	
}

//	Functions __________________________________________________________________

function escapeForRegExp (text:any) :string {
	
	return ('' + text).replace(findRegExpChars, (match) => {
		
		if (match === '*') return '.+';
		if (match === '?') return '?';
		
		return '\\' + match;
		
	});
	
}

function _copyFile (sourcePath:string, destPath:string, options?:any, callback?:any) {
	
	if (typeof options === 'function') {
		callback = options;
		options = {};
	}
	
	const source = fs.createReadStream(sourcePath);
	const dest = fs.createWriteStream(destPath);
	
	source.pipe(dest);
	
	source.on('error', (streamError:Error) => callback(streamError));
	source.on('end', () => callback());
	
}

function _walktree (job:WalkTreeJob, cwd:string, relative:string = '') {
	
	if (job.error) return; // If error no further actions
	
	const dirname = path.join(cwd, relative);
	
	fs.readdir(dirname, (dirError, names) => {
		
		if (job.error) return; // If error no further actions
		if (dirError) return job.done(dirError);
		
		job.tasks--; // directory read
		
		job.tasks += names.length;
		
		if (!job.tasks) return job.done();
		
		names.forEach((name) => {
			
			const pathname = path.join(dirname, name);
			
			if (job.result[pathname]) return job.tasks--;
			
			fs.lstat(pathname, (statError, stat) => {
				
				if (job.error) return; // If error no further actions
				if (statError) return job.done(statError);
				
				const ignoreFile = job.ignore?.test(name);
				const currentRelative = path.join(relative, name);
				let currentDirname = path.dirname(currentRelative);
				
				currentDirname = currentDirname === '.' ? '' : currentDirname + sep;
				
				if (stat.isDirectory()) {
					job.result[pathname] = {
						root: cwd,
						relative: currentRelative,
						fsPath: pathname,
						stat,
						
						path: pathname + sep,
						name: currentRelative + sep,
						basename: path.basename(currentRelative) + sep,
						dirname: currentDirname,
						extname: '',
						type: 'folder',
						ignore: ignoreFile,
					};
					if (!ignoreFile) return _walktree(job, cwd, currentRelative);
				}
				
				job.tasks--;
				
				if (stat.isFile()) {
					job.result[pathname] = {
						root: cwd,
						relative: currentRelative,
						fsPath: pathname,
						stat,
						
						path: pathname,
						name: currentRelative,
						basename: path.basename(currentRelative),
						dirname: currentDirname,
						extname: path.extname(currentRelative),
						type: 'file',
						ignore: ignoreFile,
					};
				} else if (stat.isSymbolicLink()) {
					job.result[pathname] = {
						root: cwd,
						relative: currentRelative,
						fsPath: pathname,
						stat,
						
						path: pathname,
						name: currentRelative,
						basename: path.basename(currentRelative),
						dirname: currentDirname,
						extname: '',
						type: 'symlink',
						ignore: ignoreFile,
					};
				}
				
				if (!job.tasks) job.done();
				
			});
			
		});
		
	});
	
}

export function mkdirsSync (dirname:string) {
	
	const dirnames = dirname.split(sep);
	const base = dirnames.shift() || sep;
	
	return dirnames.reduce((parent, child) => {
		
		const current = path.join(parent, child);
		
		try {
			fs.mkdirSync(current);
		} catch (error) {
			if (error.code === 'EEXIST') return current;
			throw error.code === 'ENOENT' ? new Error(`Permission denied '${current}'`) : error;
		}
		
		return current;
		
	}, base);
	
}