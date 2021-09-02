"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Util = void 0;
const assert = require("assert");
const type_util_1 = require("type.util");
class Util {
    static isClass(target) {
        return (typeof (target) === 'function' && target.toString().match(/^class/));
    }
    static equal(actual, expected) {
        if (actual.length !== expected.length) {
            return false;
        }
        try {
            assert.deepStrictEqual(actual, expected);
            return true;
        }
        catch (e) {
            // done
        }
        return false;
    }
    static copy(source) {
        if (!type_util_1.default.object(source) && !type_util_1.default.array(source)) {
            return source;
        }
        const isArray = type_util_1.default.array(source), target = isArray ? [] : {};
        for (const i in source) {
            if (!type_util_1.default.instance(source[i], RegExp) && (type_util_1.default.object(source[i]) || type_util_1.default.array(source[i]))) {
                if (isArray) {
                    target.push(Util.copy(source[i]));
                }
                else {
                    target[i] = Util.copy(source[i]);
                }
            }
            else {
                if (isArray) {
                    target.push(source[i]);
                }
                else {
                    target[i] = source[i];
                }
            }
        }
        return target;
    }
}
exports.Util = Util;
//# sourceMappingURL=util.js.map