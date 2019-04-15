"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enum_1 = require("./enum");
/* tslint:disable:variable-name */
const Injectable = (options) => {
    return (target) => {
        const a = Reflect.getMetadata(enum_1.METADATA.SCOPE, target) || [];
        Reflect.defineMetadata(enum_1.METADATA.SCOPE, (options) ? a.concat([options]) : a, target);
    };
};
exports.default = Injectable;
//# sourceMappingURL=injectable.js.map