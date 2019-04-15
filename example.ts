
import 'reflect-metadata';
import {Injectable, Inject, Module} from './index';

@Injectable()
class Log {
	count: number;

	constructor() {
		this.count = 0;
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

	constructor() {}

	displayMessage(name: string) {
		return this.log.console('welcome', name);
	}

}

class Thinger {
	@Inject(Greeter)
	greeter: Greeter;

	constructor() {
		setTimeout(() => {
			this.greeter.displayMessage('dave');
		}, 5000);
	}

}

class Error {
	@Inject(Log)
	log: Log;

	constructor() {}

	error() {
		return this.log.console('there was a error');
	}

}

const a = new Module([Thinger, Error]).build();
const b = new Module([Thinger, Error], a).build();

console.log(a, b);

setInterval(() => {
	b[1].error();
}, 1000);
