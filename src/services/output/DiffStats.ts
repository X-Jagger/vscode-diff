//	Imports ____________________________________________________________________

import { formatAmount, formatFileSize } from '../@l13/formats';
import { pluralFiles, pluralFolders, pluralSymlinks } from '../@l13/units/files';

import { Diff, DiffFile } from '../../types';
import { DiffResult } from './DiffResult';

import { DetailStats } from './stats/DetailStats';
import { FolderStats } from './stats/FolderStats';

//	Variables __________________________________________________________________



//	Initialize _________________________________________________________________



//	Exports ____________________________________________________________________

export class DiffStats {
	
	public pathA:FolderStats = new FolderStats();
	
	public pathB:FolderStats = new FolderStats();
	
	public all:DetailStats = new DetailStats();
	
	public conflicting:DetailStats = new DetailStats();
	
	public deleted:DetailStats = new DetailStats();
	
	public modified:DetailStats = new DetailStats();
	
	public unchanged:DetailStats = new DetailStats();
	
	public untracked:DetailStats = new DetailStats();
	
	public ignored:DetailStats = new DetailStats();
	
	public constructor (private result:DiffResult) {
		
		this.createStats();
		
	}
	
	private createStats () :void {
		
		const result = this.result;
		
		this.pathA.pathname = result.pathA;
		this.pathB.pathname = result.pathB;
		
		result.diffs.forEach((diff:Diff) => {
			
			if (diff.status !== 'ignored') {
				if (diff.fileA) countFileStates(this.pathA, diff.fileA);
				if (diff.fileB) countFileStates(this.pathB, diff.fileB);
				countAllStats(this.all, this.pathA, this.pathB);
			}
			
			if (diff.status === 'conflicting') countDetailStats(this.conflicting, diff);
			else if (diff.status === 'deleted') countDetailStats(this.deleted, diff);
			else if (diff.status === 'modified') countDetailStats(this.modified, diff);
			else if (diff.status === 'unchanged') countDetailStats(this.unchanged, diff);
			else if (diff.status === 'untracked') countDetailStats(this.untracked, diff);
			else if (diff.status === 'ignored') countDetailStats(this.ignored, diff);
			
		});
		
	}
	
	public report () :string {
		
		return `INFO

Compared:    ${formatFileStats(`${this.pathA.pathname}" ↔ "${this.pathB.pathname}`, this.all)}

Left Path:   ${formatFileStats(this.pathA.pathname, this.pathA)}

Right Path:  ${formatFileStats(this.pathB.pathname, this.pathB)}



RESULT

Comparisons: ${this.result.diffs.length - this.ignored.total}
Diffs:       ${this.result.diffs.length - this.ignored.total - this.unchanged.total}
Conflicts:   ${this.conflicting.total}
Created:     ${formatTotal(this.untracked)}
Deleted:     ${formatTotal(this.deleted)}
Modified:    ${formatTotal(this.modified)}
Unchanged:   ${formatTotal(this.unchanged)}
Ignored:     ${formatEntries(this.ignored)}



UPDATES
`;
		
	}
	
}

//	Functions __________________________________________________________________

function countFileStates (stats:DetailStats|FolderStats, file:DiffFile) {
	
	stats.entries++;
	stats.size += file.stat.size;
	
	if (file.type === 'file') stats.files++;
	else if (file.type === 'folder') stats.folders++;
	else if (file.type === 'symlink') stats.symlinks++;
	
}

function countAllStats (stats:DetailStats, pathA:FolderStats, pathB:FolderStats) {
	
	stats.entries = pathA.entries + pathB.entries;
	stats.size = pathA.size + pathB.size;
	stats.files = pathA.files + pathB.files;
	stats.folders = pathA.folders + pathB.folders;
	stats.symlinks = pathA.symlinks + pathB.symlinks;
	
}

function countDetailStats (stats:DetailStats, diff:Diff) {
	
	stats.total++;
	
	if (diff.ignoredEOL) stats.ignoredEOL++;
	if (diff.ignoredWhitespace) stats.ignoredWhitespace++;
	
	if (diff.fileA) countFileStates(stats, diff.fileA);
	if (diff.fileB) countFileStates(stats, diff.fileB);
	
	
}

function formatFileStats (name:string, stats:DetailStats|FolderStats) {
	
	return `"${name}"
Entries:     ${formatEntries(stats)}
Size:        ${formatFileSize(stats.size)}`;
	
}

function formatTotal (stats:DetailStats) {
	
	const ignored:string[] = [];
	
	if ((<DetailStats>stats).ignoredEOL) ignored.push('eol');
	if ((<DetailStats>stats).ignoredWhitespace) ignored.push('whitespace');
	
	const info = ignored.length ? ` [Ignored ${ignored.join(' and ')} in ${formatAmount(stats.files, pluralFiles)}]` : '';
	const entries:string[] = [];
	
	if (stats.files) entries.push(`${formatAmount(stats.files, pluralFiles)}${info}`);
	if (stats.folders) entries.push(`${formatAmount(stats.folders, pluralFolders)}`);
	if (stats.symlinks) entries.push(`${formatAmount(stats.symlinks, pluralSymlinks)}`);
	
	return entries.length ? `${stats.total} (${entries.join(', ')})` : '0';
	
}

function formatEntries (stats:DetailStats|FolderStats) {
	
	const entries:string[] = [];
	
	if (stats.files) entries.push(`${formatAmount(stats.files, pluralFiles)}`);
	if (stats.folders) entries.push(`${formatAmount(stats.folders, pluralFolders)}`);
	if (stats.symlinks) entries.push(`${formatAmount(stats.symlinks, pluralSymlinks)}`);
	
	return entries.length > 1 ? `${stats.entries} (${entries.join(', ')})` : entries[0] || '0';
	
}