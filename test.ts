
import 'reflect-metadata';
import {Injectable, Inject, Module, Param} from './index';
import * as assert from 'assert';

const built: any = {};

@Injectable()
class Config {

	constructor() {
		built.config = (built.config || 0) + 1;
	}

}

@Injectable()
class Log {

	count: number;
	config: Config;

	constructor(count, @Inject(Config) config: Config) {
		this.count = count || 0;
		this.config = config;
		built.log = (built.log || 0) + 1;
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
		built.greeter = (built.greeter || 0) + 1;
	}

}

class Thinger {

	@Param({test: 'stuff', n: 1}, 'cat', true)
	@Inject(Greeter)
	greeter: Greeter;
	egg: Log;
	log: Log;

	constructor(@Inject(Log) log: Log, @Inject(Log) egg: Log) {
		this.egg = egg;
		this.log = log;
		built.thinger = (built.thinger || 0) + 1;
	}

}

const a = new Module([Thinger]);
const outa = a.build();
const b = new Module([Thinger], a);
const outb = b.build();

assert.deepEqual(outa, outb);
assert.equal(outa[0].greeter.config, outa[0].greeter.log.config);
assert.deepEqual(outa[0].greeter.message, [{test: 'stuff', n: 1}, 'cat', true]);

console.log(built);
for (const i in built) {
	assert.equal(built[i], 1);
}
