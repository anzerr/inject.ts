"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enum_1 = require("./enum");
const util_1 = require("./util");
const nodeutil = require("util");
class Module extends require('events') {
    constructor(list, instance) {
        super();
        this.list = list;
        this.instance = ((instance instanceof Module) ? instance.instance : instance) || [];
    }
    getScope(target) {
        const o = Reflect.getMetadata(enum_1.METADATA.SCOPE, target);
        if (!o) {
            this.emit('warning', `missing @Injectable on ${target.name}}`);
            return [];
        }
        return o;
    }
    has(target, options) {
        for (const x in this.instance) {
            try {
                if (this.instance[x].tClass instanceof target) {
                    if (util_1.Util.equal(this.instance[x].tParam, options)) {
                        return this.instance[x].tClass;
                    }
                }
            }
            catch (e) {
                throw new Error(`do you have a circular dependency? failed to match ${nodeutil.format(this.instance[x].tClass)} with ${nodeutil.format(target)}`);
            }
        }
        return null;
    }
    instantiate(target, o = [], skip = false) {
        const targetClass = util_1.Util.isClass(target) ? target : target();
        const injectParam = Reflect.getMetadata(enum_1.METADATA.DEPENDANCYPARAM, targetClass);
        const options = (o) ? [...o] : [];
        for (const i in injectParam) {
            const depClass = util_1.Util.isClass(injectParam[i].dep) ? injectParam[i].dep : injectParam[i].dep();
            const found = this.has(depClass, []);
            options[injectParam[i].index] = (found) ? found : this.instantiate(depClass, []);
        }
        const a = new targetClass(...options);
        if (!skip) {
            this.instance.push({ tClass: a, tParam: o || [] });
        }
        const dep = Reflect.getMetadata(enum_1.METADATA.DEPENDANCY, targetClass);
        for (const i in dep) {
            const depClass = util_1.Util.isClass(dep[i].dep) ? dep[i].dep : dep[i].dep();
            const scope = this.getScope(depClass);
            const param = Reflect.getMetadata(enum_1.METADATA.PARAM, a, dep[i].key) || scope;
            const found = this.has(depClass, param);
            if (a[dep[i].key]) {
                throw new Error(`inject key "${dep[i].key}" is not "undefined" should not overload already existing keys`);
            }
            a[dep[i].key] = (found) ? found : this.instantiate(depClass, param);
        }
        return a;
    }
    build() {
        const o = [];
        for (const i in this.list) {
            const l = util_1.Util.isClass(this.list[i]) ? this.list[i] : this.list[i]();
            const found = this.has(l, []);
            o.push(found ? found : this.instantiate(this.list[i]));
        }
        return o;
    }
}
exports.default = Module;
//# sourceMappingURL=module.js.map