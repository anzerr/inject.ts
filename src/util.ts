
import * as path from 'path';
import * as assert from 'assert';

class Util {

	isClass(target: any): boolean {
		return (typeof(target) === 'function' && target.toString().match(/^class/));
	}

	equal(actual, expected) {
		try {
			assert.deepStrictEqual(actual, expected);
			return true;
		} catch (e) {
			// done
		}
		return false;
	}

}

const util = new Util();

export = util;
