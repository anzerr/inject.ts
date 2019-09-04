"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enum_1 = require("./enum");
/* tslint:disable:variable-name */
const Inject = (dep) => {
    return (target, key, index) => {
        if (index !== undefined) {
            const a = Reflect.getMetadata(enum_1.METADATA.DEPENDANCYPARAM, target) || [];
            a.push({ dep: dep, index: index });
            Reflect.defineMetadata(enum_1.METADATA.DEPENDANCYPARAM, a, target);
        }
        else {
            const a = Reflect.getMetadata(enum_1.METADATA.DEPENDANCY, target.constructor) || [];
            a.push({ dep: dep, key: key });
            Reflect.defineMetadata(enum_1.METADATA.DEPENDANCY, a, target.constructor);
        }
    };
};
exports.default = Inject;
//# sourceMappingURL=inject.js.map