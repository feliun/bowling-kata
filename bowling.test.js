const expect = require('expect.js');
const BowlingGame = require('./bowling');

describe("bowling", () => {
    let bowling;

    beforeEach(() => {
        bowling = BowlingGame();
    });

    it('has the right interface', () => {
        expect(bowling.roll).to.be.a('function');
        expect(bowling.getScore).to.be.a('function');
    });
    
    it('accounts', () => {
        
    });
});