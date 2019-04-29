
import 'reflect-metadata';
import { METADATA } from './enum';

/* tslint:disable:variable-name */
const Param = (...args: any[]) => {
	/*return (target, propertyKey: string, descriptor: PropertyDescriptor) => {
		const a = Reflect.getMetadata(METADATA.PARAM, target) || [];
		console.log('Param', target, propertyKey, descriptor;
		Reflect.defineMetadata(METADATA.PARAM, (options) ? a.concat([options]) : a, target);
	};*/
	return Reflect.metadata(METADATA.PARAM, args);
};

export default Param;
