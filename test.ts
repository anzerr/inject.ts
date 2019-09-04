
import 'reflect-metadata';
import {Injectable, Inject, Module, Param} from './index';
import * as assert from 'assert';

@Injectable()
class Config {

	constructor() {
		// nothing
	}

}

@Injectable()
class Log {

	count: number;
	config: Config;

	constructor(count, @Inject(Config) config: Config) {
		this.count = count || 0;
		this.config = config;
	}

}

@Injectable()
class Greeter {

	@Inject(() => Log)
	log: Log;

	@Inject(Config)
	config: Config;

	message: any;


	constructor(...arg) {
		this.message = arg;
	}

}

class Thinger {

	@Param({test: 'stuff', n: 1}, 'cat', true)
	@Inject(Greeter)
	greeter: Greeter;

}

const a = new Module([Thinger]);
const outa = a.build();
const b = new Module([Thinger], a);
const outb = b.build();

assert.deepEqual(outa, outb);
assert.equal(outa[0].greeter.config, outa[0].greeter.log.config);
assert.deepEqual(outa[0].greeter.message, [{test: 'stuff', n: 1}, 'cat', true]);
