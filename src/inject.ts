
import 'reflect-metadata';
import { METADATA } from './enum';

/* tslint:disable:variable-name */
const Inject = (dep: (() => Object) | Object) => {
	return (target: any, key: string, index?: number) => {
		if (index !== undefined) {
			const a = Reflect.getMetadata(METADATA.DEPENDANCYPARAM, target) || [];
			a.push({dep, index});
			Reflect.defineMetadata(METADATA.DEPENDANCYPARAM, a, target);
		} else {
			const a = Reflect.getMetadata(METADATA.DEPENDANCY, target.constructor) || [];
			a.push({dep, key});
			Reflect.defineMetadata(METADATA.DEPENDANCY, a, target.constructor);
		}
	};
};

export default Inject;
