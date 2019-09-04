
import 'reflect-metadata';
import {METADATA} from './enum';

/* tslint:disable:variable-name */
const Param = (...args: any[]): any => {
	return Reflect.metadata(METADATA.PARAM, args);
};

export default Param;
