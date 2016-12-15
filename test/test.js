import elrUtilities from '../src/main.js';

const elr = elrUtilities();
const expect = require('chai').expect;
const chai = require('chai');
const assertArrays = require('chai-arrays');
const chaiSubset = require('chai-subset');

chai.use(assertArrays);
chai.use(chaiSubset);

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
    });
});

describe('elr', function() {
    describe('#trim', function() {
        it('should remove leading and trailing whitespace', function () {
            expect(elr.trim('hello  ')).to.equal('hello');
            expect(elr.trim('   hello  ')).to.equal('hello');
            expect(elr.trim('   hello')).to.equal('hello');
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
});