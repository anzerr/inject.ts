"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enum_1 = require("./enum");
/* tslint:disable:variable-name */
const Inject = (dep) => {
    return (target, key) => {
        const a = Reflect.getMetadata(enum_1.METADATA.DEPENDANCY, target.constructor) || [];
        a.push({ dep, key });
        Reflect.defineMetadata(enum_1.METADATA.DEPENDANCY, a, target.constructor);
    };
};
exports.default = Inject;
//# sourceMappingURL=inject.js.map