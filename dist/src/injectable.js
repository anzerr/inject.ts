"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enum_1 = require("./enum");
/* tslint:disable:variable-name */
const Injectable = (...args) => {
    return (target) => {
        Reflect.defineMetadata(enum_1.METADATA.SCOPE, args, target);
    };
};
exports.default = Injectable;
//# sourceMappingURL=injectable.js.map