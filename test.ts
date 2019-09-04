
import 'reflect-metadata';
import { Injectable, Inject, Module, Param } from './index';
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

	@Param({ test: 'stuff', n: 1 }, 'cat', true)
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

const a: any = new Module([Thinger]);
const outa = a.build();
const b: any = new Module([Thinger], a);
const outb = b.build();

assert.deepEqual(outa, outb);
assert.equal(outa[0].greeter.config, outa[0].greeter.log.config);
assert.deepEqual(outa[0].greeter.message, [{ test: 'stuff', n: 1 }, 'cat', true]);

for (const i in built) {
	assert.equal(built[i], 1);
}
assert.equal(b.instance.length, 4);
let c = b.instantiate(Thinger);
assert.equal(c instanceof Thinger, true);
assert.equal(c.log, outa[0].greeter.log);
assert.equal(b.instance.length, 5);
assert.equal(built.thinger, 2);
c = b.instantiate(Thinger, [], true);
assert.equal(built.thinger, 3);
assert.equal(b.instance.length, 5);
assert.equal(c.log, outa[0].greeter.log);
assert.deepEqual(c, outa[0]);
console.log(built);
