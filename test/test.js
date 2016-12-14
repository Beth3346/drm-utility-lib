import elrUtilities from '../src/main.js';

const elr = elrUtilities();
const expect = require('chai').expect;
const chai = require('chai');
const assertArrays = require('chai-arrays');
const chaiSubset = require('chai-subset');

chai.use(assertArrays);
chai.use(chaiSubset);

describe('elr', function() {
    describe('#trim', function() {
        it('should remove leading and trailing whitespace', function () {
            expect(elr.trim('hello  ')).to.equal('hello');
            expect(elr.trim('   hello  ')).to.equal('hello');
            expect(elr.trim('   hello')).to.equal('hello');
        });
    });
    describe('numeric regex', function() {
        it('should find a numeral', function() {
            const str = 'Hello';
            const num = 4;
            const strNum = 'Hel4lo';
            expect(elr.patterns.numeral.test(str)).to.equal(false);
            expect(elr.patterns.numeral.test(num)).to.equal(true);
            expect(elr.patterns.numeral.test(strNum)).to.equal(true);
        });
    });
    describe('alphaLower regex', function() {
        it('should find lowercase letters', function() {
            const str = 'Hello';
            const num = 4;
            const strNum = 'Hel4lo';
            expect(elr.patterns.alphaLower.test(str)).to.equal(true);
            expect(elr.patterns.alphaLower.test(num)).to.equal(false);
            expect(elr.patterns.alphaLower.test(strNum)).to.equal(true);
        });
    });
    describe('alphaUpper regex', function() {
        it('should find uppercase letters', function() {
            const str = 'Hello';
            const num = 4;
            const strNum = 'hel4lo';
            const strUpper = 'HELLO';
            expect(elr.patterns.alphaUpper.test(str)).to.equal(true);
            expect(elr.patterns.alphaUpper.test(num)).to.equal(false);
            expect(elr.patterns.alphaUpper.test(strNum)).to.equal(false);
            expect(elr.patterns.alphaUpper.test(strUpper)).to.equal(true);
        });
    });
});