import elrUtilities from '../src/main.js';

const elr = elrUtilities();
const expect = require('chai').expect;
const chai = require('chai');
const assertArrays = require('chai-arrays');
const chaiSubset = require('chai-subset');
const chaiObject = require('chai-shallow-deep-equal');
const chaiJquery = require('chai-jquery');

global.$ = global.jQuery = require('jquery');

chai.use(assertArrays);
chai.use(chaiSubset);
chai.use(chaiObject);
// chai.use(chaiJquery);

describe('elr patterns', function() {
    describe('numeric regex', function() {
        it('should find a numeral', function() {
            expect(elr.patterns.numeral.test('Hello')).to.be.false;
            expect(elr.patterns.numeral.test(4)).to.be.true;
            expect(elr.patterns.numeral.test('Hel4lo')).to.be.true;
        });
        it('should return 4', function() {
            expect(elr.patterns.numeral.exec('Hello')).to.equal(null);
            expect(elr.patterns.numeral.exec(4)[0]).to.equal('4');
            expect(elr.patterns.numeral.exec('Hel4lo')[0]).to.equal('4');
        });
    });
    describe('alphaLower regex', function() {
        it('should find lowercase letters', function() {
            expect(elr.patterns.alphaLower.test('Hello')).to.be.true;
            expect(elr.patterns.alphaLower.test(4)).to.be.false;
            expect(elr.patterns.alphaLower.test('hel4lo')).to.be.true;
            expect(elr.patterns.alphaLower.test('HELLO')).to.be.false;
        });
        it('should return lowercase letters', function() {
            expect(elr.patterns.alphaLower.exec('Hello')[0]).to.equal('ello');
            expect(elr.patterns.alphaLower.exec(4)).to.equal(null);
            expect(elr.patterns.alphaLower.exec('hel4lo')[0]).to.equal('hel');
        });
    });
    describe('alphaUpper regex', function() {
        it('should find uppercase letters', function() {
            expect(elr.patterns.alphaUpper.test('Hello')).to.be.true;
            expect(elr.patterns.alphaUpper.test(4)).to.be.false;
            expect(elr.patterns.alphaUpper.test('hel4lo')).to.be.false;
            expect(elr.patterns.alphaUpper.test('HELLO')).to.be.true;
        });
        it('should return uppercase letters', function() {
            expect(elr.patterns.alphaUpper.exec('Hello')[0]).to.equal('H');
            expect(elr.patterns.alphaUpper.exec(4)).to.equal(null);
            expect(elr.patterns.alphaUpper.exec('hel4lo')).to.equal(null);
            expect(elr.patterns.alphaUpper.exec('HELLO')[0]).to.equal('HELLO');
        });
    });
    describe('specialCharacters regex', function() {
        it('should find special characters', function() {
            expect(elr.patterns.specialCharacters.test('Hello')).to.be.false;
            expect(elr.patterns.specialCharacters.test(4)).to.be.false;
            expect(elr.patterns.specialCharacters.test('hel4lo')).to.be.false;
            expect(elr.patterns.specialCharacters.test('HEL&# LO')).to.be.true;
        });
        it('should return special characters', function() {
            expect(elr.patterns.specialCharacters.exec('Hello')).to.equal(null);
            expect(elr.patterns.specialCharacters.exec(4)).to.equal(null);
            expect(elr.patterns.specialCharacters.exec('hel4lo')).to.equal(null);
            expect(elr.patterns.specialCharacters.exec('HEL&# LO')[0]).to.equal('&#');
        });
    });
    describe('allNumbers regex', function() {
        it('should find numeric strings', function() {
            expect(elr.patterns.allNumbers.test('Hello')).to.be.false;
            expect(elr.patterns.allNumbers.test(424)).to.be.true;
            expect(elr.patterns.allNumbers.test('424')).to.be.true;
            expect(elr.patterns.allNumbers.test('424 Rabbits')).to.be.false;
            expect(elr.patterns.allNumbers.test('December 14')).to.be.false;
        });
        it('should return numeric strings', function() {
            expect(elr.patterns.allNumbers.exec('Hello')).to.equal(null);
            expect(elr.patterns.allNumbers.exec(424)[0]).to.equal('424');
            expect(elr.patterns.allNumbers.exec('424')[0]).to.equal('424');
            expect(elr.patterns.allNumbers.exec('424 Rabbits')).to.equal(null);
        });
    });
    describe('allAlphaLower regex', function() {
        it('should find lowercase strings', function() {
            expect(elr.patterns.allAlphaLower.test('Hello')).to.be.false;
            expect(elr.patterns.allAlphaLower.test('hello')).to.be.true;
            expect(elr.patterns.allAlphaLower.test('424 Rabbits')).to.be.false;
        });
        it('should return lowercase strings', function() {
            expect(elr.patterns.allAlphaLower.exec('Hello')).to.equal(null);
            expect(elr.patterns.allAlphaLower.exec('hello')[0]).to.equal('hello');
            expect(elr.patterns.allAlphaLower.exec('424 Rabbits')).to.equal(null);
        });
    });
    describe('allAlphaUpper regex', function() {
        it('should find uppercase strings', function() {
            expect(elr.patterns.allAlphaUpper.test('Hello')).to.be.false;
            expect(elr.patterns.allAlphaUpper.test('HELLO')).to.be.true;
            expect(elr.patterns.allAlphaUpper.test('424 Rabbits')).to.be.false;
        });
        it('should return uppercase strings', function() {
            expect(elr.patterns.allAlphaUpper.exec('Hello')).to.equal(null);
            expect(elr.patterns.allAlphaUpper.exec('HELLO')[0]).to.equal('HELLO');
            expect(elr.patterns.allAlphaUpper.exec('424 Rabbits')).to.equal(null);
        });
    });
    describe('allSpecialCharacters regex', function() {
        it('should find special characters', function() {
            expect(elr.patterns.allSpecialCharacters.test('Hello')).to.be.false;
            expect(elr.patterns.allSpecialCharacters.test('&$&##^')).to.be.true;
            expect(elr.patterns.allSpecialCharacters.test('424 Rabb*(its')).to.be.false;
        });
        it('should return special characters', function() {
            expect(elr.patterns.allSpecialCharacters.exec('Hello')).to.equal(null);
            expect(elr.patterns.allSpecialCharacters.exec('&$&##^')[0]).to.equal('&$&##^');
            expect(elr.patterns.allSpecialCharacters.exec('424 Rabb*(its')).to.equal(null);
        });
    });
    describe('integer regex', function() {
        it('should find integers', function() {
            expect(elr.patterns.integer.test(23)).to.be.true;
        });
        it('should not find floats', function() {
            expect(elr.patterns.integer.test(45.4)).to.be.false;
        });
        it('should find negative integers', function() {
            expect(elr.patterns.integer.test(-23)).to.be.true;
        });
        it('should find not find negative floats', function() {
            expect(elr.patterns.integer.test(-45.4)).to.be.false;
        });
        it('should find not strings', function() {
            expect(elr.patterns.integer.test('hello')).to.be.false;
        });
    });
    describe('full name regex', function() {
        it('should verify that a string is a full name', function() {
            expect(elr.patterns.fullName.test('Elizabeth Rogers')).to.be.true;
            expect(elr.patterns.fullName.test('Elizabeth')).to.be.false;
        });
        it('should allow dashes and spaces in names', function() {
            expect(elr.patterns.fullName.test('Sarah Michelle Gellar')).to.be.true;
            expect(elr.patterns.fullName.test('Mary-Jo Some thing')).to.be.true;
        });
    });
    describe('alpha regex', function() {
        it('should verify alpha characters', function() {
            expect(elr.patterns.alpha.test('Beth')).to.be.true;
        });
        it('should not return true if the string is all numbers', function() {
            expect(elr.patterns.alpha.test(45)).to.be.false;
            expect(elr.patterns.alpha.test('45')).to.be.false;
        });
        it('should not return true if the string is all special characters', function() {
            expect(elr.patterns.alpha.test('$%#%')).to.be.false;
        });
        it('should return true if a string contains numbers, alpha and special characters', function() {
            expect(elr.patterns.alpha.test('Be3$th 34')).to.be.true;
        });
    });
    describe('allAlpha regex', function() {
        it('should verify alpha characters', function() {
            expect(elr.patterns.allAlpha.test('Beth')).to.be.true;
        });
        it('should not return true if the string is all numbers', function() {
            expect(elr.patterns.allAlpha.test(45)).to.be.false;
            expect(elr.patterns.allAlpha.test('45')).to.be.false;
        });
        it('should not return true if the string is all special characters', function() {
            expect(elr.patterns.allAlpha.test('$%#%')).to.be.false;
        });
        it('should return false if a string contains numbers, alpha and special characters', function() {
            expect(elr.patterns.allAlpha.test('Be3$th 34')).to.be.false;
        });
    });
    describe('alphaNum regex', function() {
        it('should return true if string is all alpha characters', function() {
            expect(elr.patterns.alphaNum.test('Beth')).to.be.true;
        });
        it('should return true if the string is all numbers', function() {
            expect(elr.patterns.alphaNum.test(45)).to.be.true;
            expect(elr.patterns.alphaNum.test('45')).to.be.true;
        });
        it('should not return true if the string contains special characters', function() {
            expect(elr.patterns.alphaNum.test('$%#%')).to.be.false;
            expect(elr.patterns.alphaNum.test('Beth33$%#%')).to.be.false;
        });
        it('should return true if a string contains numbers and alpha characters', function() {
            expect(elr.patterns.alphaNum.test('Beth34')).to.be.true;
        });
    });
    describe('username regex', function() {
        it('should allow letters, number, and underscore only', function() {
            expect(elr.patterns.username.test('Beth7384')).to.be.true;
            expect(elr.patterns.username.test('Beth_Rogers')).to.be.true;
        });
        it('should not allow spaces', function() {
            expect(elr.patterns.username.test('Beth Rogers')).to.be.false;
        });
        it('should not allow any special characters besides underscore', function() {
            expect(elr.patterns.username.test('Beth_Rogers')).to.be.true;
            expect(elr.patterns.username.test('Beth_R$ogers')).to.be.false;
        });
    });
    describe('spaces regex', function() {
        it('should return true if there are spaces', function() {
            expect(elr.patterns.spaces.test('Beth Rogers')).to.be.true;
            expect(elr.patterns.spaces.test('Beth  Rog ers')).to.be.true;
            expect(elr.patterns.spaces.test('Beth_Rogers')).to.be.false;
        });
    });
    describe('website regex', function() {
        const validURL = 'http://www.amazon.com';
        const invalidURL = 'http://www.amazoncom';
        it('should return true if string is a valid website', function() {
            expect(elr.patterns.website.test(validURL)).to.be.true;
        });
        it('should return false if string is not a valid website', function() {
            expect(elr.patterns.website.test(invalidURL)).to.be.false;
        });
    });
    describe('url regex', function() {
        it('should return true if string is a valid url', function() {
            expect(elr.patterns.url.test('http://www.amazon.com')).to.be.true;
            expect(elr.patterns.url.test('http://www.amazon.com/hello')).to.be.true;
            expect(elr.patterns.url.test('http://amazon.com')).to.be.true;
            expect(elr.patterns.url.test('http://www.amazon.com/hello/')).to.be.true;
        });
        it('should allow https', function() {
            expect(elr.patterns.url.test('https://www.amazon.com')).to.be.true;
        });
        it('should return false if string is not a valid url', function() {
            // expect(elr.patterns.url.test('http://www.amazoncom')).to.be.false;
            expect(elr.patterns.url.test('http//www.amazon.com')).to.be.false;
        });
        it('should return false if http:// is left out', function() {
            expect(elr.patterns.url.test('www.amazon.com')).to.be.false;
        });
        xit('should return false if there are too many trailing slashes', function() {
            expect(elr.patterns.url.test('http://www.amazon.com//')).to.be.false;
        });
    });
    describe('email regex', function() {
        it('should return true if the email is valid', function() {
            expect(elr.patterns.email.test('beth3346@gmail.com')).to.be.true;
            expect(elr.patterns.email.test('beth.3346@gmail.edu')).to.be.true;
            expect(elr.patterns.email.test('beth-3346@gmail.edu')).to.be.true;
        });
        it('should return false if the email does not contain @', function() {
            expect(elr.patterns.email.test('beth3346gmail.com')).to.be.false;
        });
        it('should return false if the email does not contain top level domain', function() {
            expect(elr.patterns.email.test('beth3346@gmailcom')).to.be.false;
        });
    });
    describe('postal code regex', function() {
        it('should return true if the postal code is 5 digits', function() {
            expect(elr.patterns.postalCode.test('77494')).to.be.true;
        });
        it('should return true if the postal code is 9 digits with a dash', function() {
            expect(elr.patterns.postalCode.test('77494-3232')).to.be.true;
        });
        it('should return false if the postal code is 9 digits with no dash', function() {
            expect(elr.patterns.postalCode.test('774943232')).to.be.false;
        });
        it('should return false if the postal code is 6 digits', function() {
            expect(elr.patterns.postalCode.test('774943')).to.be.false;
        });
        it('should return false if the postal code has alpha characters', function() {
            expect(elr.patterns.postalCode.test('7749f')).to.be.false;
        });
    });
    describe('phone regex', function() {
        it('should return true if the phone # is valid', function() {
            expect(elr.patterns.phone.test('281-123-4567')).to.be.true;
        });
        it('should allow for dots instead of dashes', function() {
            expect(elr.patterns.phone.test('281.123.4567')).to.be.true;
        });
        it('should return true for 10 digit strings', function() {
            expect(elr.patterns.phone.test('2811234567')).to.be.true;
        });
        it('should allow for parentheses', function() {
            expect(elr.patterns.phone.test('(281)123-4567')).to.be.true;
        });
        it('should allow for parentheses', function() {
            expect(elr.patterns.phone.test('(281) 123-4567')).to.be.true;
        });
        it('should allow for extensions', function() {
            expect(elr.patterns.phone.test('281-123-4567x242')).to.be.true;
        });
        it('should return false if the phone # is not valid', function() {
            expect(elr.patterns.phone.test('281-123-456')).to.be.false;
            expect(elr.patterns.phone.test('281) 123-456')).to.be.false;
            expect(elr.patterns.phone.test('(281 123-456')).to.be.false;
        });
        it('should return false if the phone # is too long', function() {
            expect(elr.patterns.phone.test('281-123-456479')).to.be.false;
        });
        it('should return false if the phone # contains alpha characters', function() {
            expect(elr.patterns.phone.test('281-123-NOPE')).to.be.false;
        });
    });
    describe('slug regex', function() {
        it('should return true if the string contains alphanumeric characters and dashes', function() {
            expect(elr.patterns.slug.test('cat-toys2')).to.be.true;
            expect(elr.patterns.slug.test('cat-toys')).to.be.true;
            expect(elr.patterns.slug.test('caTtoys2')).to.be.true;
        });
        it('should return false if the string contains spaces', function() {
            expect(elr.patterns.slug.test('cat toys2')).to.be.false;
        });
        it('should return false if the string contains special characters other than dashes', function() {
            expect(elr.patterns.slug.test('cat-toy^s')).to.be.false;
        });
    });
    describe('tag regex', function() {
        it('should return true if an html tag is present', function() {
            expect(elr.patterns.tags.test('<div>Something</div>')).to.be.true;
            expect(elr.patterns.tags.test('Hello<div>Something</div>')).to.be.true;
            expect(elr.patterns.tags.test('Hello<div>Somet</div>hing')).to.be.true;
        });
        it('should return false if an html tag is not present', function() {
            expect(elr.patterns.tags.test('Something')).to.be.false;
            expect(elr.patterns.tags.test('Someth<div>ing')).to.be.false;
        });
    });
    describe('credit card regex', function() {
        it('should return true if a valid credit card number is entered', function() {
            expect(elr.patterns.creditCard.test('6011690695678138')).to.be.true;
            expect(elr.patterns.creditCard.test('5476569831778491')).to.be.true;
            expect(elr.patterns.creditCard.test('4716720441222627')).to.be.true;
            expect(elr.patterns.creditCard.test('4716720441222627')).to.be.true;
            expect(elr.patterns.creditCard.test('4913798621943379')).to.be.true;
            expect(elr.patterns.creditCard.test('371858049874763')).to.be.true;
            expect(elr.patterns.creditCard.test('4738-3443-5353-3452')).to.be.true;
            expect(elr.patterns.creditCard.test('4738 3443 5353 3452')).to.be.true;
        });
        it('should return false if an invalid credit card is entered', function() {
            expect(elr.patterns.creditCard.test('473834334525353')).to.be.false;
            expect(elr.patterns.creditCard.test('1738343345254353')).to.be.false;
            expect(elr.patterns.creditCard.test('2738343345425353')).to.be.false;
            expect(elr.patterns.creditCard.test('4738-34435353-3452')).to.be.false;
            expect(elr.patterns.creditCard.test('4738 3443%5353 3452')).to.be.false;
            expect(elr.patterns.creditCard.test('4738343K4525353')).to.be.false;
        });
    });
    describe('CVV regex', function() {
        it('should return true if the cvv is 3-4 digits', function() {
            expect(elr.patterns.cvv.test('345')).to.be.true;
            expect(elr.patterns.cvv.test('3545')).to.be.true;
        });
        it('should return false if the cvv not 3-4 digits', function() {
            expect(elr.patterns.cvv.test('34544')).to.be.false;
            expect(elr.patterns.cvv.test('35')).to.be.false;
        });
        it('should return false if the cvv not 3-4 digits', function() {
            expect(elr.patterns.cvv.test('34544')).to.be.false;
            expect(elr.patterns.cvv.test('35')).to.be.false;
        });
        it('should return false if the cvv contains anything other than numbers', function() {
            expect(elr.patterns.cvv.test('3F44')).to.be.false;
            expect(elr.patterns.cvv.test('DSE')).to.be.false;
        });
    });
    describe('monthDayYear regex', function() {
        it('should return true is string is month day year', function() {
            expect(elr.patterns.monthDayYear.test('12-24-2016')).to.be.true;
            expect(elr.patterns.monthDayYear.test('03-24-2016')).to.be.true;
            expect(elr.patterns.monthDayYear.test('3-24-2016')).to.be.true;
            expect(elr.patterns.monthDayYear.test('03/24/2016')).to.be.true;
            expect(elr.patterns.monthDayYear.test('03.24.2016')).to.be.true;
        });
        it('there is no month 13', function() {
            expect(elr.patterns.monthDayYear.test('13-24-2016')).to.be.false;
            expect(elr.patterns.monthDayYear.test('00-24-2016')).to.be.false;
            expect(elr.patterns.monthDayYear.test('0-24-2016')).to.be.false;
            expect(elr.patterns.monthDayYear.test('00-24-206')).to.be.false;
            expect(elr.patterns.monthDayYear.test('12-45-206')).to.be.false;
        });
    });
    describe('time regex', function() {
        it('should return true if time is valid', function() {
            expect(elr.patterns.time.test('12:30am')).to.be.true;
            expect(elr.patterns.time.test('12:30pm')).to.be.true;
            expect(elr.patterns.time.test('3:30pm')).to.be.true;
            expect(elr.patterns.time.test('3:30:19pm')).to.be.true;
            expect(elr.patterns.time.test('03:30pm')).to.be.true;
            expect(elr.patterns.time.test('3:30AM')).to.be.true;
            expect(elr.patterns.time.test('12:30')).to.be.true;
            expect(elr.patterns.time.test('12:30:32')).to.be.true;
        });
        it('should return false if time is invalid', function() {
            expect(elr.patterns.time.test('13:30am')).to.be.false;
            expect(elr.patterns.time.test('12:78pm')).to.be.false;
            expect(elr.patterns.time.test('12:30hj')).to.be.false;
            expect(elr.patterns.time.test('12:30:93am')).to.be.false;
            expect(elr.patterns.time.test('34:30')).to.be.false;
            expect(elr.patterns.time.test('24:30')).to.be.false;
        });
    });
    describe('hour regex', function() {
        it('should return true if hour is valid', function() {
            expect(elr.patterns.hour.test('12:30am')).to.be.true;
            expect(elr.patterns.hour.test('23:30')).to.be.true;
        });
        it('should return false if hour is invalid', function() {
            expect(elr.patterns.hour.test('56:30pm')).to.be.false;
            expect(elr.patterns.hour.test('1230pm')).to.be.false;
        });
    });
    describe('minute regex', function() {
        it('should return true if minute is valid', function() {
            expect(elr.patterns.minute.test('12:05am')).to.be.true;
            expect(elr.patterns.minute.test('12:30am')).to.be.true;
            expect(elr.patterns.minute.test('23:30')).to.be.true;
            expect(elr.patterns.minute.test('12:00am')).to.be.true;
        });
        it('should return false if minute is invalid', function() {
            expect(elr.patterns.minute.test('12:80pm')).to.be.false;
            expect(elr.patterns.minute.test('1230pm')).to.be.false;
        });
    });
});

describe('elr', function() {
    before(() => {
        const $ = require('jquery');
        global.$ = $;
        global.jQuery = $;
    });

    describe('#each', function() {
        it('should iterate over an array', function() {
            const times5 = function(nums) {
                const arr = [];

                elr.each(nums, function() {
                    arr.push(this * 5);
                })

                return arr;
            };

            expect(times5([1,2,3])).to.containSubset([5,10,15]);
        });
        it('should iterate over an object', function() {
            const names = {
                'first': {
                    'first': 'George',
                    'last': 'Washington'
                },
                'second': {
                    'first': 'John',
                    'last': 'Adams'
                },
                'third': {
                    'first': 'Thomas',
                    'last': 'Jefferson'
                }
            };
            const getNames = function(names) {
                const arr = [];

                elr.each(names, function() {
                    arr.push(`${this.first} ${this.last}`);
                })

                return arr;
            };

            expect(getNames(names)).to.be.equalTo(['George Washington', 'John Adams', 'Thomas Jefferson']);
        });
    });
    describe('#trim', function() {
        it('should remove leading and trailing whitespace', function () {
            expect(elr.trim('hello  ')).to.equal('hello');
            expect(elr.trim('   hello  ')).to.equal('hello');
            expect(elr.trim('   hello')).to.equal('hello');
        });
        it('should return false if no string is provided', function () {
            expect(elr.trim('')).to.be.false;
        });
    });
    describe('#isOdd', function() {
        it('should return true if an odd number is provided', function() {
            expect(elr.isOdd(1)).to.be.true;
        });
        it('should return false if an even number is provided', function() {
            expect(elr.isOdd(4)).to.be.false;
        });
    });
    describe('#isEven', function() {
        it('should return false if an odd number is provided', function() {
            expect(elr.isEven(1)).to.be.false;
        });
        it('should return true if an even number is provided', function() {
            expect(elr.isEven(4)).to.be.true;
        });
    });
    describe('#isDate', function() {
        it('should true if string contains a valid date', function() {
            expect(elr.isDate('03-12-2016')).to.be.true;
            expect(elr.isDate('3-12-2016')).to.be.true;
            expect(elr.isDate('03/12/2016')).to.be.true;
            expect(elr.isDate('12/24/2016 is Christmas')).to.be.true;
        });
        it('should false if string does not contain a valid date', function() {
            expect(elr.isDate('03-12-26')).to.be.false;
            expect(elr.isDate('45-12-2016')).to.be.false;
            expect(elr.isDate('03/839/2016')).to.be.false;
            expect(elr.isDate('I like Christmas')).to.be.false;
        });
    });
    describe('#isNumber', function() {
        it('should true if string begins with a number', function() {
            expect(elr.isNumber('5')).to.be.true;
            expect(elr.isNumber('3-12-2016')).to.be.true;
            expect(elr.isNumber('3 Dogs')).to.be.true;
        });
        it('should false if string does not begin with a number', function() {
            expect(elr.isNumber('I like Christmas')).to.be.false;
            expect(elr.isNumber('Christmas is in 9 days')).to.be.false;
        });
    });
    describe('#isAlpha', function() {
        it('should true if string contains alpha characters', function() {
            expect(elr.isAlpha('3 Dogs')).to.be.true;
            expect(elr.isAlpha('I like Christmas')).to.be.true;
            expect(elr.isAlpha('Christmas is in 9 days')).to.be.true;
        });
        it('should false if string does not contain alpha characters', function() {
            expect(elr.isAlpha('5')).to.be.false;
            expect(elr.isAlpha('3-12-2016')).to.be.false;
        });
    });
    describe('#isTime', function() {
        it('should true if string contains a valid time', function() {
            expect(elr.isTime('12:30am')).to.be.true;
            expect(elr.isTime('04:45:23am')).to.be.true;
            expect(elr.isTime('18:23')).to.be.true;
        });
        it('should false if string does not contain a valid time', function() {
            expect(elr.isTime('13:08am')).to.be.false;
            expect(elr.isTime('32:34')).to.be.false;
            expect(elr.isTime('I like Christmas')).to.be.false;
        });
    });
    describe('#getDataTypes', function() {
        it('should return an array of data types', function() {
            const values = {
                'name': 'Beth',
                'age': 33,
                'birthday': '03/24/1983',
                'time': '12:30pm'
            };
            const types = ['alpha', 'number', 'date', 'time'];
            expect(elr.getDataTypes(values)).to.be.equalTo(types);
        });
        it('should return an array of data types', function() {
            const values = ['Dog', 'Cat', 'Deer'];
            const types = ['alpha'];
            expect(elr.getDataTypes(values)).to.be.equalTo(types);
        });
        it('should return an array of data types', function() {
            const values = [1, 2, 3, 4];
            const types = ['number'];
            expect(elr.getDataTypes(values)).to.be.equalTo(types);
        });
        it('should be able to override with type parameter', function() {
            const values = ['1', '2', '3', '4'];
            const types = ['alpha'];
            expect(elr.getDataTypes(values, 'alpha')).to.be.equalTo(types);
        });
    });
    describe('#generateRandomString', function() {
        it('should return a string of the given length', function() {
            expect(elr.generateRandomString(10)).to.have.lengthOf(10);
            expect(elr.generateRandomString(4)).to.have.lengthOf(4);
        });
        it('should return a string of the given length', function() {
            expect(elr.generateRandomString(5)).to.be.a('string');
        });
    });
    describe('#checkBlacklist', function() {
        it('should return the array index if string is in the blacklist array', function() {
            expect(elr.checkBlacklist('password', ['password', 'hello'])).to.not.equal(-1);
            expect(elr.checkBlacklist('hello', ['password', 'hello'])).to.equal(1);
        });
        it('should return -1 if string is not in the blacklist array', function() {
            expect(elr.checkBlacklist('howdy', ['password', 'hello'])).to.equal(-1);
        });
    });
    describe('#checkLength', function() {
        it('should return true if the string is the required length', function() {
            expect(elr.checkLength('hello', 5)).to.be.true;
            expect(elr.checkLength('hello', 3)).to.be.false;
        });
    });
    describe('#cleanAlpha', function() {
        it('should remove words in the ignore words array', function() {
            expect(elr.cleanAlpha('The Lion King')).to.equal('Lion King');
            expect(elr.cleanAlpha('A Farewell to Arms')).to.equal('Farewell to Arms');
            expect(elr.cleanAlpha('The Lion King')).to.equal('Lion King');
        });
        it('should only remove leading words', function() {
            expect(elr.cleanAlpha('In the afternoon', ['Tiny'])).to.equal('In the afternoon');
        });
        it('should take a custom array', function() {
            expect(elr.cleanAlpha('Tiny Dancer', ['Tiny'])).to.equal('Dancer');
        });
    });
    describe('#capitalize', function() {
        it('should capitalize the first letter of each word', function() {
            expect(elr.capitalize('hello beth')).to.equal('Hello Beth');
        });
    });
    describe('#cleanString', function() {
        it('should remove the provided re value from the provided string', function() {
            expect(elr.cleanString('We gotta get out of this place', ' this')).to.equal('We gotta get out of place')
        });
    });
    describe('#strToArray', function() {
        it('should take a comma separated string and convert to an array', function() {
            expect(elr.strToArray('Mary, Jo, Beth, Amy')).to.be.ofSize(4);
            expect(elr.strToArray('Mary, Jo, Beth, Amy')).to.be.equalTo(['Mary', 'Jo', 'Beth', 'Amy']);
        });
    });
    describe('#isArray', function() {
        it('should return true if object is an array', function() {
            const arr = ['Mary', 'Jo', 'Beth', 'Amy'];
            const objArr = [{'name': 'Mary'}, {'name': 'Jo'}];
            const str = 'Hello';
            const num = 2;
            expect(elr.isArray(arr)).to.be.true;
            expect(elr.isArray(objArr)).to.be.true;
            expect(elr.isArray(str)).to.be.false;
            expect(elr.isArray(num)).to.be.false;
        });
    });
    describe('#unique', function() {
        it('should return an array of unique values', function() {
            const arr = ['dogs', 'cats', 'cats', 'dogs', 'birds', 'rabbits'];
            expect(elr.unique(arr)).to.containSubset(['cats', 'dogs', 'birds', 'rabbits']);
            expect(elr.unique(arr)).to.be.ofSize(4);
        });
    });
    describe('#inArray', function() {
        it('should return the index if the item exists in the array', function() {
            const arr = ['Mary', 'Jo', 'Beth', 'Amy'];
            expect(elr.inArray(arr, 'Jo')).to.equal(1);
        });
        it('should return -1 if the item does not exist in the array', function() {
            const arr = ['Mary', 'Jo', 'Beth', 'Amy'];
            expect(elr.inArray(arr, 'Laurie')).to.equal(-1);
        });
        it('should take a starting index', function() {
            const arr = ['Mary', 'Jo', 'Beth', 'Amy'];
            expect(elr.inArray(arr, 'Mary', 1)).to.equal(-1);
            expect(elr.inArray(arr, 'Beth', 1)).to.equal(2);
        });
        xit('should take a negative starting index', function() {
            const arr = ['Mary', 'Jo', 'Beth', 'Amy'];
            expect(elr.inArray(arr, 'Jo', -1)).to.equal(1);
        });
    });
    describe('#toArray', function() {
        const items = {
            'dog1': {'textContent': 'Jessie'},
            'dog2': {'textContent': 'Musashi'},
            'dog3': {'textContent': 'Chloe'}
        };
        it('should take a list of items and create an array', function() {
            expect(elr.toArray(items)).to.be.equalTo(['Jessie', 'Musashi', 'Chloe']);
        });
    });
    describe('#createArrays', function() {
        it('should create an object with arrays', function() {
            const list = ['dogs', 'cats', 'birds'];
            const animals = {
                'dogs': [],
                'cats': [],
                'birds': []
            };
            expect(elr.createArrays(list)).to.shallowDeepEqual(animals);
        });
    });
    describe('#concatArrays', function() {
        it('should contact an object with properties as arrays into a single array', function() {
            const arrayObj = {
                'dogs': ['Jessie', 'Chloe', 'Musashi', 'Hogan'],
                'cats': ['Tom', 'Sylvester'],
                'birds': ['Tweety', 'Toucan Sam']
            };
            const combinedArr = [
                'Jessie',
                'Chloe',
                'Musashi',
                'Hogan',
                'Tom',
                'Sylvester',
                'Tweety',
                'Toucan Sam'
            ];
            expect(elr.concatArrays(arrayObj)).to.be.equalTo(combinedArr);
        });
    });
});