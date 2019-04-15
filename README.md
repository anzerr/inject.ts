
### `Intro`
A simple example of a decorator for dependency injection

#### `Install`
``` bash
npm install --save git+https://git@github.com/anzerr/inject.ts.git
```

### `Example`
``` javascript
import 'reflect-metadata';
import {Injectable, Inject, Module} from 'inject.ts';

@Injectable()
class Log {
	count: number;

	constructor() {
		this.count = 0;
	}

	info(...arg) {
		this.count += 1;
		return console.log(this.count, ...arg);
	}

}

class Ping {
	@Inject(Log)
	logger: Log;

	constructor() {
		setInterval(() => this.logger.info('ping'), 5000);
	}

}

new Module([Ping]).build();
```