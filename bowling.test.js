const expect = require('expect.js');
const BowlingGame = require('./bowling');

describe("bowling", () => {
    let bowling;

    beforeEach(() => {
        bowling = BowlingGame();
    });

    it('should have the right interface', () => {
        expect(bowling.rolls).to.be.an('array');
        expect(bowling.roll).to.be.a('function');
        expect(bowling.getScore).to.be.a('function');
    });
});