//	Imports ____________________________________________________________________

const _parse = JSON.parse;

//	Variables __________________________________________________________________

const findComments = /"(?:[^"\r\n\\]*(?:\.)*)*"|(\/\*(?:.|[\r\n])*?\*\/|\/\/[^\r\n]*)/g;

//	Initialize _________________________________________________________________



//	Exports ____________________________________________________________________

export function parse (json:string, ...args:any[]) {
	
	return _parse(json.replace(findComments, (match, comment) => comment ? '' : match), ...args);
	
}

//	Functions __________________________________________________________________

