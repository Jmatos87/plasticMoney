const assert = require('chai').assert;
const expect = require('chai').expect;


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

describe('input value formatting', function() {
	it('given a string, returns a string with no spaces or hyphens', function() {
		const goodStringSpaces = formatInput('2345 2085 0923 6098');
		const goodStringHyphens = formatInput('2345-2085-0923-6098');
		const badString = formatInput('123a-3456-9843-3456');
		const worstString = formatInput('!@#$%asdfaASDFAS')

		expect(goodStringSpaces).to.equal('2345208509236098');
		expect(goodStringHyphens).to.equal('2345208509236098')
		expect(badString).to.equal('123a345698433456');
		expect(worstString).to.equal('!@#$%asdfaASDFAS')
	})
})

describe('validate string to check for any non-digit characters', function() {
	it('returns false if string contains invalid characters', function() {
		const goodString = validateRawInput('2345208509236098')
		const badString = validateRawInput('123a345698433456')
		const worstString = validateRawInput('!@#$1asd23ASDFA4')

		expect(goodString).to.equal(true)
		expect(badString).to.equal(false)
		expect(worstString).to.equal(false)
	})
})

describe('credit card validation', function() {
	it('should validate amex', function() {
		var cardNumber = '378282246310005';
		var issuer = validateCardNumber(cardNumber);
		expect(issuer).to.equal('amex'); 
	})

	it('should validate MC', function() {
		var cardNumber = '5555555555554444';
		var issuer = validateCardNumber(cardNumber);
		expect(issuer).to.equal('masterCard');  
	})

	it('should validate Visa', function() {
		var cardNumber = '4242424242424242';
		var issuer = validateCardNumber(cardNumber);
		expect(issuer).to.equal('visa'); 
	})

	it('should point out an invalid card number with an undesired string', function() {
		//This card number is one character too short
		var badCardNumberLengthShort = '411111111111111';
		//This card number has a leading number that wouldn't belong to any issuer
		var badCardNumber = '1234567890123456';
		//This card number is one character too long
		var badCardNumberLengthLong = '41111111111111111';



		var issuer = validateCardNumber(badCardNumberLengthShort);
		var issure2 = validateCardNumber(badCardNumber);
		var issuer3 = validateCardNumber(badCardNumberLengthLong)

		expect(issuer).to.equal('invalid card :('); 
		expect(issure2).to.equal('invalid card :(');
		expect(issuer3).to.equal('invalid card :(')
	})
})

//Thank you for the opportunity!