"use strict";
class Util {
    isClass(target) {
        return (typeof (target) === 'function' && target.toString().match(/^class/));
    }
}
const util = new Util();
module.exports = util;
//# sourceMappingURL=util.js.map