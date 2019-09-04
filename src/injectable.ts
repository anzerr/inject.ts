
import 'reflect-metadata';
import {METADATA} from './enum';

/* tslint:disable:variable-name */
const Injectable = (...args: any[]) => {
	return (target: Record<string, any>) => {
		Reflect.defineMetadata(METADATA.SCOPE, args, target);
	};
};

export default Injectable;
