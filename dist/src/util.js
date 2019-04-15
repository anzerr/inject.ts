"use strict";
class Util {
    getAllMethodNames(prototype) {
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
    isClass(target) {
        return (typeof (target) === 'function' && target.toString().match(/^class/));
    }
}
const util = new Util();
module.exports = util;
//# sourceMappingURL=util.js.map