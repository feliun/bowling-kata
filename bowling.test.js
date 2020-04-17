const expect = require('expect.js');
const BowlingGame = require('./lib/bowling');

describe("bowling game", () => {
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
        bowling.roll(1);
        expect(bowling.getScore()).to.equal("frame: 1,? -- total: 0");
    });
    
    it('accounts for a second roll', () => {
        bowling.roll(1);
        bowling.roll(4);
        expect(bowling.getScore()).to.equal("frame: 1,4 -- total: 5");
    });
    
    it('accounts for a partial second frame', () => {
        bowling.roll(1);
        bowling.roll(4);
        bowling.roll(4);
        expect(bowling.getScore()).to.equal("frame: 4,? -- total: 5");
    });

    it('accounts for two complete frames', () => {
        bowling.roll(1);
        bowling.roll(4);
        bowling.roll(4);
        bowling.roll(5);
        expect(bowling.getScore()).to.equal("frame: 4,5 -- total: 14");
    });

    describe("spare cases", () => {
        it('accounts for a spare frame', () => {
            bowling.roll(2);
            bowling.roll(8);
            expect(bowling.getScore()).to.equal("frame: 2,/ -- total: 0");
        });
    });
    
    describe("strike cases", () => {
        it('accounts for a strike frame', () => {
            bowling.roll(10);
            expect(bowling.getScore()).to.equal("frame: X -- total: 0");
        });
        
        it('accounts for a regular frame followed by a strike frame', () => {
            bowling.roll(2);
            bowling.roll(5);
            bowling.roll(10);
            expect(bowling.getScore()).to.equal("frame: X -- total: 7");
        });
    });
});