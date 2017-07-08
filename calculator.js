(function () {
	function addEventListeners() {
		var elCollection = document.getElementsByTagName('button');

		for (var i = elCollection.length - 1; i >= 0; i--) {
			elCollection[i].addEventListener('click', handleClick);
		}
	}

// Private function
	function handleClick(event) {
		var elType = this.dataset.type;

		switch (elType) {
			case 'number':
			    calc.handleNumber(this.dataset.value);
			    break;
		    case 'operator':
		        calc.handleOperator(this.dataset.value);
		        break;
		    case 'result':
		    	calc.handleResult();
		    	break;
		    case 'reset':
		        calc.reset();
		}
	}

	/** 
		Equivelent to var Calculator = {};
	*/

// Object
	var Calculator = function() {
		//Constructor
		addEventListeners();

		this.resultEl = document.getElementById('result');
		this.enteredEl = document.getElementById('entered');

		this.clearBuffer = function () {
			if (!this.firstNumber) {
				this.firstNumber = parseInt(this.currentNumberBuffer);
				this.currentNumberBuffer = 0;
			} else {
				this.secondNumber = parseInt(this.currentNumberBuffer);
			}
		};

		this.handleNumber = function (number) {
			this.currentNumberBuffer = this.currentNumberBuffer ? this.currentNumberBuffer += number : number;
			this.enteredEl.innerText = this.enteredEl.innerText + number;
		};

		this.handleOperator = function (operator) {
			this.clearBuffer();
			this.operator = operator;
			this.enteredEl.innerText = this.enteredEl.innerText + operator;
		};

		this.handleResult = function () {
			this.clearBuffer();
			this.result = this.operators[this.operator](this.firstNumber, this.secondNumber);
			this.resultEl.innerText = this.result;

			return this.result;
		};

		// Equivelent to a property in {}

		this.reset = function () {
			this.firstNumber = null;
			this.secondNumber = null;
			this.currentNumberBuffer = null;
			this.result = null;
			this.resetResultEl();
			this.resetEnteredEl();
		};

		this.resetResultEl = function () {
			this.resultEl.innerText = null;
		};
	};

// Prototype = Parent
	Calculator.prototype.operators = {
		'+': function (a, b) {return a + b},
		'-': function (a, b) {return a - b},
		'/': function (a, b) {return a / b},
		'x': function (a, b) {return a * b},
		'^': function (a, b) {return Math.pow(a, b)}
	};

	// Functions can be declared on the prototype as well

	Calculator.prototype.resetEnteredEl = function () {
			this.enteredEl.innerText = null;
		};

		//Instantiate your object and it will run your constructor

	var calc = new Calculator();
})();