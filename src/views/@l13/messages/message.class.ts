//	Imports ____________________________________________________________________

import { remove } from '../../../@l13/arrays';
import { MessageListener } from '../../../types';

//	Variables __________________________________________________________________

const LISTENERS = Symbol.for('listeners');

//	Initialize _________________________________________________________________



//	Exports ____________________________________________________________________

export class Message {
	
	private [LISTENERS]:{ [name:string]: MessageListener[] } = Object.create(null);
	
	public constructor (private root:any) {
		
		window.addEventListener('message', (event) => {
			
			const message = event.data;
			const command = message.command;
			const data = message.data;
			const listeners = this[LISTENERS][command];
			
			if (listeners) listeners.forEach((listener) => listener(data));
			
		});
		
	}
	
	public on (name:string, listener:MessageListener) :void {
		
		const listeners:EventListener[] = this[LISTENERS][name] || (this[LISTENERS][name] = []);
		
		listeners[listeners.length] = listener;
		
	}
	
	public send (command:string, data:any = null) :void {
		
		this.root.postMessage({ command, data });
		
	}
	
	public removeMessageListener (name:string, listener?:MessageListener) {
		
		if (!listener) return delete this[LISTENERS][name];
		
		const listeners:null|MessageListener[] = this[LISTENERS][name] || null;
		
		if (listeners) {
			remove(listeners, listener);
			if (!listeners.length) delete this[LISTENERS][name];
		}
		
	}
	
}

//	Functions __________________________________________________________________

