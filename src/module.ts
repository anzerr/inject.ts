
import 'reflect-metadata';
import { METADATA } from './enum';
import * as util from './util';

const isClass = (target: any) : boolean => (typeof(target) === 'function' && target.toString().match(/^class/));

export default class Module extends require('events') {

	private list: any[];
	private instance: any[];

	constructor(list: Object[], instance?: Object[] | Module) {
		super();
		this.list = list;
		this.instance = ((instance instanceof Module) ? instance.instance : instance) || [];
	}

	getScope(target: any) {
		const o = Reflect.getMetadata(METADATA.SCOPE, target);
		if (!o) {
			this.emit('warning', `missing @Injectable on ${target.name}}`);
			return [];
		}
		return o;
	}

	has(target: any, options: any[]): object | void {
		for (const x in this.instance) {
			if (this.instance[x].tClass instanceof target)  {
				if (util.equal(this.instance[x].tParam, options)) {
					return this.instance[x].tClass;
				}
			}
		}
		return null;
	}

	instantiate(target: any, options?: any[]): Object {
		const dep = Reflect.getMetadata(METADATA.DEPENDANCY, target);
		const a = new (util.isClass(target) ? target : target())(...(options || []));
		for (const i in dep) {
			const scope = this.getScope(dep[i].dep);
			const param =  Reflect.getMetadata(METADATA.PARAM, a, dep[i].key) || scope,
				found = this.has(dep[i].dep, param);
			a[dep[i].key] = (found) ? found : this.instantiate(dep[i].dep, param);
		}
		this.instance.push({tClass: a, tParam: options || []});
		return a;
	}

	build() {
		const o = [];
		for (const i in this.list) {
			const l = util.isClass(this.list[i]) ? this.list[i] : this.list[i]();
			const found = this.has(l, []);
			o.push(found ? found : this.instantiate(this.list[i]));
		}
		return o;
	}

}
