let Obj = {
	method: function() {
		let max = {
			m: () => {
				console.log("func -> arrow f", this);
			},
			n: function() {
				console.log("func -> func", this);
			}
		};
		max.m();
		max.n();
	},

	method2: () => {
		let max = {
			m2: () => {
				console.log("arrow f -> arrow f", this);
			},
			n2: function() {
				console.log("arrow f -> func", this);
			}
		};
		max.m2();
		max.n2();
	}
};

Obj.method();
Obj.method2();
