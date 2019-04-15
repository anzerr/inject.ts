
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
			console.log(target, o);
			this.emit('warning', `missing @Injectable on ${target.name}}`);
			return {};
		}
		let options = {};
		for (const i in o) {
			options = {...options, ...o[i]};
		}
		return options;
	}

	has(target: any): object | void {
		let found = null;
		for (const x in this.instance) {
			if (this.instance[x] instanceof target)  {
				found = this.instance[x];
				break;
			}
		}
		return found;
	}

	instantiate(target: any, options?: object): Object {
		const dep = Reflect.getMetadata(METADATA.DEPENDANCY, target);
		const a = new (util.isClass(target) ? target : target())(options);
		for (const i in dep) {
			const found = this.has(dep[i].dep);
			dep[i].dep = (found) ? found : this.instantiate(dep[i].dep, this.getScope(dep[i].dep));
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
