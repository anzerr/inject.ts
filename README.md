
### `Intro`
A simple example of a decorator for dependency injection.

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/inject.ts.git
```

### `Example`
``` javascript
import 'reflect-metadata';
import {Injectable, Inject, Module} from 'inject.ts';

@Injectable()
class Config {

	constructor() {}

	get() {
		return {
			start: Math.floor(Math.random() * 10)
		};
	}

}

@Injectable()
class Log {
	count: number;

	constructor(@Inject(Config) config: Config) {
		this.count = config.get().start;
	}

	info(...arg) {
		this.count += 1;
		return console.log(this.count, ...arg);
	}

}

class Ping {
	@Inject(Log)
	logger: Log;

	interval: any;

	constructor() {
		this.interval = setInterval(() => this.logger.info('ping'), 5000);
	}

	close() {
		clearInterval(this.interval);
	}

}

new Module([Ping]).build();
```