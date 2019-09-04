
import 'reflect-metadata';
import {METADATA} from './enum';

/* tslint:disable:variable-name */
const Inject = (dep: (() => Record<string, any>) | Record<string, any>) => {
	return (target: any, key: string, index?: number) => {
		if (index !== undefined) {
			const a = Reflect.getMetadata(METADATA.DEPENDANCYPARAM, target) || [];
			a.push({dep: dep, index: index});
			Reflect.defineMetadata(METADATA.DEPENDANCYPARAM, a, target);
		} else {
			const a = Reflect.getMetadata(METADATA.DEPENDANCY, target.constructor) || [];
			a.push({dep: dep, key: key});
			Reflect.defineMetadata(METADATA.DEPENDANCY, a, target.constructor);
		}
	};
};

export default Inject;
