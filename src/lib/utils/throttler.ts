export class Throttled<T extends any[]> {
	fn: (...args: T) => void;
	delay: number;
	last: number;

	constructor(fn: (...args: T) => void, delay = 2000) {
		this.fn = fn;
		this.delay = delay;
		this.last = 0;
	}

	call(...args: T) {
		const now = Date.now();
		if (now - this.last < this.delay) {
			return;
		}

		this.last = now;
		this.fn(...args);
	}
}
