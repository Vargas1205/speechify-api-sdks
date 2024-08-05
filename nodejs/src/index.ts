export interface Example {
	x: number;
}

export function exampleFunction(): Example {
	return { x: 1 };
}

export class ExampleClass {
	constructor() {
		console.log("ExampleClass constructor");
	}

	#examplePrivateMethod() {
		console.log("ExampleClass private method");
	}

	exampleMethod() {
		console.log("ExampleClass method");
	}
}
