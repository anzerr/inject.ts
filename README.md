
### `Intro`
![GitHub Actions status | linter](https://github.com/anzerr/inject.ts/workflows/linter/badge.svg)
![GitHub Actions status | publish](https://github.com/anzerr/inject.ts/workflows/publish/badge.svg)
![GitHub Actions status | test](https://github.com/anzerr/inject.ts/workflows/test/badge.svg)

A simple example of a decorator for dependency injection.

#### `Install`
``` bash
npm install --save git+https://github.com/anzerr/inject.ts.git
npm install --save @anzerr/inject.ts
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

### Circular Dependency
Best to have zero but you can make them work if you need them after class construction
``` javascript

class A {

	@Inject(B) // 2. start to init "B"
	b: B; // 4. "B" finished construction injected into "A"

	constructor() { // 1. init "A" (added to instance list)
		// don't need "B" now but later in the class usage
	}

}

class B {

	a: A;

	constructor(@Inject(A) a) { // 3. look up "A" (found in instance list)
		// need "A" here
		this.a = a;
	}

}

new Module([A]).build();
```