
import 'reflect-metadata';
import {METADATA} from './enum';

const Injectable = (...args: any[]) => {
	return (target: Record<string, any>) => {
		Reflect.defineMetadata(METADATA.SCOPE, args, target);
	};
};

export default Injectable;
