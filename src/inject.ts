
import 'reflect-metadata';
import {METADATA} from './enum';
import {Util} from './util';

const Inject = (dep: (() => Record<string, any>) | Record<string, any>) => {
	return (target: any, key: string, index?: number) => {
		if (index !== undefined) {
			const original = Reflect.getMetadata(METADATA.DEPENDANCYPARAM, target) || [];
			const out = Util.copy<any>(original)
			out.push({dep: dep, index: index});
			Reflect.defineMetadata(METADATA.DEPENDANCYPARAM, out, target);
		} else {
			const original = Reflect.getMetadata(METADATA.DEPENDANCY, target.constructor) || [];
			const out = Util.copy<any>(original)
			out.push({dep: dep, key: key});
			Reflect.defineMetadata(METADATA.DEPENDANCY, out, target.constructor);
		}
	};
};

export default Inject;
