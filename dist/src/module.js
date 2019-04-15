"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const enum_1 = require("./enum");
const util = require("./util");
const isClass = (target) => (typeof (target) === 'function' && target.toString().match(/^class/));
class Module extends require('events') {
    constructor(list, instance) {
        super();
        this.list = list;
        this.instance = ((instance instanceof Module) ? instance.instance : instance) || [];
    }
    getScope(target) {
        const o = Reflect.getMetadata(enum_1.METADATA.SCOPE, target);
        if (!o) {
            console.log(target, o);
            this.emit('warning', `missing @Injectable on ${target.name}}`);
            return {};
        }
        let options = {};
        for (const i in o) {
            options = Object.assign({}, options, o[i]);
        }
        return options;
    }
    has(target) {
        let found = null;
        for (const x in this.instance) {
            if (this.instance[x] instanceof target) {
                found = this.instance[x];
                break;
            }
        }
        return found;
    }
    instantiate(target, options) {
        const dep = Reflect.getMetadata(enum_1.METADATA.DEPENDANCY, target);
        const a = new (util.isClass(target) ? target : target())(options);
        for (const i in dep) {
            const found = this.has(dep[i].dep);
            if (found) {
                dep[i].dep = found;
            }
            else {
                this.instance.push((dep[i].dep = this.instantiate(dep[i].dep, this.getScope(dep[i].dep))));
            }
            a[dep[i].key] = dep[i].dep;
        }
        this.instance.push(a);
        return a;
    }
    build() {
        const o = [];
        for (const i in this.list) {
            const found = this.has(this.list[i]);
            o.push(found ? found : this.instantiate(this.list[i]));
        }
        return o;
    }
}
exports.default = Module;
//# sourceMappingURL=module.js.map