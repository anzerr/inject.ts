
import * as assert from 'assert';
import is from 'type.util';

export class Util {

	static isClass(target: any): boolean {
		return (typeof (target) === 'function' && target.toString().match(/^class/));
	}

	static equal(actual: any, expected: any): any {
		if (actual.length !== expected.length) {
			return false;
		}
		try {
			assert.deepStrictEqual(actual, expected);
			return true;
		} catch (e) {
			// done
		}
		return false;
	}

	static copy<T>(source: T): T {
		if (!is.object(source) && !is.array(source)) {
			return source;
		}
		const isArray = is.array(source),
			target: any = isArray ? [] : {};
		for (const i in source) {
			if (!is.instance(source[i], RegExp) && (is.object(source[i]) || is.array(source[i]))) {
				if (isArray) {
					target.push(Util.copy(source[i]));
				} else {
					target[i] = Util.copy(source[i]);
				}
			} else {
				if (isArray) {
					target.push(source[i]);
				} else {
					target[i] = source[i];
				}
			}
		}
		return target;
	}

}
