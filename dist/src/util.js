"use strict";
const assert = require("assert");
class Util {
    isClass(target) {
        return (typeof (target) === 'function' && target.toString().match(/^class/));
    }
    equal(actual, expected) {
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
}
const util = new Util();
module.exports = util;
//# sourceMappingURL=util.js.map