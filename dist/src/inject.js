"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enum_1 = require("./enum");
const util_1 = require("./util");
const Inject = (dep) => {
    return (target, key, index) => {
        if (index !== undefined) {
            const original = Reflect.getMetadata(enum_1.METADATA.DEPENDANCYPARAM, target) || [];
            const out = util_1.Util.copy(original);
            out.push({ dep: dep, index: index });
            Reflect.defineMetadata(enum_1.METADATA.DEPENDANCYPARAM, out, target);
        }
        else {
            const original = Reflect.getMetadata(enum_1.METADATA.DEPENDANCY, target.constructor) || [];
            const out = util_1.Util.copy(original);
            out.push({ dep: dep, key: key });
            Reflect.defineMetadata(enum_1.METADATA.DEPENDANCY, out, target.constructor);
        }
    };
};
exports.default = Inject;
//# sourceMappingURL=inject.js.map