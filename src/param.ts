
import 'reflect-metadata';
import {METADATA} from './enum';

const Param = (...args: any[]): any => {
	return Reflect.metadata(METADATA.PARAM, args);
};

export default Param;
