
import * as path from 'path';

class Util {

	getAllMethodNames(prototype: any) {
		let out = [];
		do {
			out = out.concat(Object.getOwnPropertyNames(prototype).filter(prop => {
				const descriptor = Object.getOwnPropertyDescriptor(prototype, prop);
				if (descriptor.set || descriptor.get) {
					return false;
				}
				return prop !== 'constructor' && typeof prototype[prop] === 'function';
			}));
			/* tslint:disable:no-parameter-reassignment */
		} while ((prototype = Reflect.getPrototypeOf(prototype)) && prototype !== Object.prototype);
		return out;
	}

	isClass(target: any): boolean {
		return (typeof(target) === 'function' && target.toString().match(/^class/));
	}

}

const util = new Util();

export = util;
