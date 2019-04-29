"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enum_1 = require("./enum");
/* tslint:disable:variable-name */
const Param = (...args) => {
    /*return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
        const a = Reflect.getMetadata(METADATA.PARAM, target) || [];
        console.log('Param', target, propertyKey, descriptor;
        Reflect.defineMetadata(METADATA.PARAM, (options) ? a.concat([options]) : a, target);
    };*/
    return Reflect.metadata(enum_1.METADATA.PARAM, args);
};
exports.default = Param;
//# sourceMappingURL=param.js.map