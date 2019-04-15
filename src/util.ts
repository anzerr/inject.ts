
import * as path from 'path';

class Util {

	isClass(target: any): boolean {
		return (typeof(target) === 'function' && target.toString().match(/^class/));
	}

}

const util = new Util();

export = util;
