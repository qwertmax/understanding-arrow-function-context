# understanding-arrow-function-context

```javascript
let Obj = {
	method1: function() {
		let max = {
			m: () => {
				console.log("func -> arrow f:", this);
			},
			n: function() {
				console.log("func -> func:", this);
			}
		};
		max.m();
		max.n();
	},

	method2: () => {
		let max = {
			m2: () => {
				console.log("arrow f -> arrow f:", this);
			},
			n2: function() {
				console.log("arrow f -> func:", this);
			}
		};
		max.m2();
		max.n2();
	}
};

Obj.method1();
Obj.method2();
```

Output will be like this:

```bash
func -> arrow f: {method: ƒ, method2: ƒ}
func -> func: {m: ƒ, n: ƒ}
arrow f -> arrow f: undefined
arrow f -> func: {m2: ƒ, n2: ƒ}
```

## consider standard functions

when we have a standard function in `javascript` it has it's own context (with it's own `this`). You can see it in block:

```javascript
method1: function() {
	let max = {
		m: () => {
			console.log("func -> arrow f:", this);
		},
		n: function() {
			console.log("func -> func:", this);
		}
	};
}
```

here 2 methods: `m` and `n`.

-   Method `n` is standard function from `method1` (whitch is standard function as well). This means that inside `n` we will have `this` = `{m: ƒ, n: ƒ}`
-   Method `m` is arrow function from `method1` (whitch is still standard function). This means that inside `m` we will have `this` = `{method: ƒ, method2: ƒ}`. Context from inherit object (from `Obj`)

## consider arrow functions

when we have a arrow function in `javascript` it inherit context fron parent's object. You can see it in block:

```javascript
method2: () => {
	let max = {
		m2: () => {
			console.log("arrow f -> arrow f:", this);
		},
		n2: function() {
			console.log("arrow f -> func:", this);
		}
	};
};
```

here 2 methods: `m2` and `n2`.

-   Method `m2` is arrow function from `method2` (whitch is arrow function too!). This means that `m2` inherit context from parent object, but parent object is arrow function as well (be careful) this mean that `this` = `undefined`. Why? Because `Obj -> method2 -> m2`. We forward context up to `Obj`.
-   Method `n2` is standard function from `method2` (whitch is arrow function). This means that inside `n2` we will have `this` = `{m2: ƒ, n2: ƒ}`.
