
import 'reflect-metadata';
import {Injectable, Inject, Module, Param} from './index';

@Injectable()
class Config {

	constructor() {
		// nothing
	}

	get(): {[key: string]: any} {
		return {
			start: Math.floor(Math.random() * 10)
		};
	}

}

@Injectable()
class Log {

	count: number;

	constructor(count, @Inject(Config) config: Config) {
		console.log('arg Log', count, config.get());
		this.count = count || config.get().start;
	}

	console(...arg): void {
		this.count += 1;
		console.log(this.count, ...arg);
	}

}

@Injectable()
class Greeter {

	@Inject(() => Log)
	log: Log;

	constructor(...arg) {
		console.log('arg Greeter', arg);
	}

	displayMessage(name: string): void {
		return this.log.console('welcome', name);
	}

}

class Thinger {

	@Param({test: 'stuff', n: 1}, 'cat', true)
	@Inject(Greeter)
	greeter: Greeter;

	interval: any;

	constructor(...arg) {
		console.log('arg Thinger', arg);
		this.interval = setInterval(() => {
			this.greeter.displayMessage('dave');
		}, 2000);
	}

	close(): void {
		clearInterval(this.interval);
	}

}

class Error {

	@Param(100)
	@Inject(Log)
	log: Log;

	constructor(...arg) {
		console.log('arg Error', arg);
	}

	error(): void {
		return this.log.console('there was a error');
	}

}

const a = new Module([Thinger, Error]);
a.build();
const b = new Module([Thinger, Error], a);
const c = b.build();

console.log(c);

const error = setInterval(() => {
	c[1].error();
}, 1000);

setTimeout(() => {
	c[0].close();
	clearInterval(error);
}, 1000 * 10);
