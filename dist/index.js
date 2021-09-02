"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Param = exports.Module = exports.Inject = exports.Injectable = void 0;
require("reflect-metadata");
const inject_1 = require("./src/inject");
exports.Inject = inject_1.default;
const injectable_1 = require("./src/injectable");
exports.Injectable = injectable_1.default;
const module_1 = require("./src/module");
exports.Module = module_1.default;
const param_1 = require("./src/param");
exports.Param = param_1.default;
//# sourceMappingURL=index.js.map