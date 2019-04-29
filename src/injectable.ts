
import 'reflect-metadata';
import { METADATA } from './enum';

/* tslint:disable:variable-name */
const Injectable = (...args: any[]) => {
	return (target: Object) => {
		Reflect.defineMetadata(METADATA.SCOPE, args, target);
	};
};

export default Injectable;
