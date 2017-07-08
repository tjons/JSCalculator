(function () {
	function addEventListeners() {
		var elCollection = document.getElementsByTagName('button');

		for (var i = elCollection.length - 1; i >= 0; i--) {
			elCollection[i].addEventListener('click', handleClick);
		}
	}

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

	var Calculator = function() {
		addEventListeners();

		this.resultEl = document.getElementById('result');
		this.enteredEl = document.getElementById('entered');
	};

	Calculator.prototype.operators = {
		'+': function (a, b) {return a + b},
		'-': function (a, b) {return a - b},
		'/': function (a, b) {return a / b},
		'x': function (a, b) {return a * b},
		'^': function (a, b) {return Math.pow(a, b)}
	};

	Calculator.prototype.clearBuffer = function () {
		if (!this.firstNumber) {
			this.firstNumber = parseInt(this.currentNumberBuffer);
			this.currentNumberBuffer = 0;
		} else {
			this.secondNumber = parseInt(this.currentNumberBuffer);
		}
	};

	Calculator.prototype.handleNumber = function (number) {
		this.currentNumberBuffer = this.currentNumberBuffer ? this.currentNumberBuffer += number : number;
		this.enteredEl.innerText = this.enteredEl.innerText + number;
	};

	Calculator.prototype.handleOperator = function (operator) {
		this.clearBuffer();
		this.operator = operator;
		this.enteredEl.innerText = this.enteredEl.innerText + operator;
	};

	Calculator.prototype.handleResult = function () {
		this.clearBuffer();
		this.result = this.operators[this.operator](this.firstNumber, this.secondNumber);
		this.resultEl.innerText = this.result;

		return this.result;
	};

	Calculator.prototype.reset = function () {
		this.firstNumber = null;
		this.secondNumber = null;
		this.currentNumberBuffer = null;
		this.result = null;
		this.resetResultEl();
		this.resetEnteredEl();
	};

	Calculator.prototype.resetResultEl = function () {
		this.resultEl.innerText = null;
	};

	Calculator.prototype.resetEnteredEl = function () {
		this.enteredEl.innerText = null;
	}

	var calc = new Calculator();
	window.calc = calc;
})();