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
    
    it('accounts for a just started game', () => {
        expect(bowling.getScore()).to.equal("frame: ?,? -- total: 0");
    });
    
    it('accounts for a first roll', () => {
        bowling.roll(2);
        expect(bowling.getScore()).to.equal("frame: 2,? -- total: 0");
    });
    
    it('accounts for a second roll', () => {
        bowling.roll(2);
        bowling.roll(4);
        expect(bowling.getScore()).to.equal("frame: 2,4 -- total: 6");
    });
    
    it('accounts for a partial second frame', () => {
        bowling.roll(2);
        bowling.roll(4);
        bowling.roll(5);
        expect(bowling.getScore()).to.equal("frame: 5,? -- total: 6");
    });

    it('accounts for two complete frames', () => {
        bowling.roll(2);
        bowling.roll(4);
        bowling.roll(5);
        bowling.roll(4);
        expect(bowling.getScore()).to.equal("frame: 5,4 -- total: 15");
    });
});