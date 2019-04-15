
import 'reflect-metadata';
import { METADATA } from './enum';

/* tslint:disable:variable-name */
const Injectable = (options?: object) => {
	return (target: Object) => {
		const a = Reflect.getMetadata(METADATA.SCOPE, target) || [];
		Reflect.defineMetadata(METADATA.SCOPE, (options) ? a.concat([options]) : a, target);
	};
};

export default Injectable;
