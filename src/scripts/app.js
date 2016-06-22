const React = require('react'),
	ReactDOM = require('react-dom')

const formatInput = function(inputString) {
	// split on non-digit characters
	// join
	const formatted = inputString.split(/\s|-/).join('');
	return formatted
}
const validateRawInput = function (formattedString){
	// check for invalid characters
	const invalidChars = formattedString.match(/\D/g);
	if (!invalidChars) {
		return true;
	}
	return false;
}
const validateCardNumber = function(formattedString) {
	const visa = formattedString.match(/^4[0-9]{15}\b/)
	const amex = formattedString.match(/^3[47][0-9]{13}\b/)
	const masterCard = formattedString.match(/^5[1-5][0-9]{14}\b/)

	if(visa){
		return 'visa'
	}
	else if(amex){
		return 'amex'
	}
	else if (masterCard){
		return 'masterCard'
	}
	else return 'invalid card :('
}

const app = function() {

	const Container = React.createClass({

		cardValidator: function() {
			var userInput = this.state.userInput
			var formattedString = formatInput(userInput)
			var booleanValidation = validateRawInput(formattedString)

			if(booleanValidation){
				var number = parseInt(formattedString)
				var issuer = validateCardNumber(formattedString)

				if(issuer !== 'invalid card :('){
					localStorage.setItem(issuer,number)
					alert('Congratulations! Your credit card number has been saved!')
				}
				else alert("Sorry we don't accept that credit card provider.")

			}
			else alert('Please input a valid credit card number')
		},

		userEntry: function() {
			var input = document.querySelector('input')
			this.setState({
				userInput:input.value
			}) 
		},

		render() {
			return (
				<div id='container'>
					<h1>Safety Net</h1>
					<h3> This is a very legit app with tons of encryption so you can submit your credit card number with confidence! </h3>
					<img src='https://avatars0.githubusercontent.com/u/16376264?v=3&s=460' />
					<input type='text' placeholder='Type your credit card number here'onKeyUp={this.userEntry}/>
					<div id='button' onClick={this.cardValidator} >Submit</div>
				</div>
			) 
		}
	})

	ReactDOM.render(<Container/>,document.querySelector('.container'))
}

app()