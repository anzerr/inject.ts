
import 'reflect-metadata';
import {Injectable, Inject, Module, Param} from './index';

@Injectable()
class Log {
	count: number;

	constructor(count) {
		console.log('arg Log', count);
		this.count = count || 0;
	}

	console(...arg) {
		this.count += 1;
		return console.log(this.count, ...arg);
	}

}

@Injectable()
class Greeter {
	@Inject(() => Log)
	log: Log;

	constructor(...arg) {
		console.log('arg Greeter', arg);
	}

	displayMessage(name: string) {
		return this.log.console('welcome', name);
	}

}

class Thinger {
	@Param({test: 'stuff', n: 1}, 'cat', true)
	@Inject(Greeter)
	greeter: Greeter;

	constructor(...arg) {
		console.log('arg Thinger', arg);
		setTimeout(() => {
			this.greeter.displayMessage('dave');
		}, 5000);
	}

}

class Error {
	@Param(100)
	@Inject(Log)
	log: Log;

	constructor(...arg) {
		console.log('arg Error', arg);
	}

	error() {
		return this.log.console('there was a error');
	}

}

const a = new Module([Thinger, Error]);
a.build();
const b = new Module([Thinger, Error], a);
const c = b.build();

console.log(a, b);

setInterval(() => {
	c[1].error();
}, 1000);
