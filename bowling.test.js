const expect = require('expect.js');
const BowlingGame = require('./lib/bowling');

const MAX_SCORE = 10;

describe("bowling game", () => {
    let bowling;

    const forceSpare = (pins) => {
        bowling.roll(pins);
        bowling.roll(MAX_SCORE - pins);
    };

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
            forceSpare(2);
            expect(bowling.getScore()).to.equal("frame: 2,/ -- total: 10");
        });
        
        it('stops counting when a spare is reached', () => {
            bowling.roll(1);
            bowling.roll(4);
            bowling.roll(4);
            bowling.roll(5);
            forceSpare(6);
            expect(bowling.getScore()).to.equal("frame: 6,/ -- total: 24");
        });
        
        it('applies a spare extra points', () => {
            bowling.roll(1);
            bowling.roll(4);
            bowling.roll(4);
            bowling.roll(5);
            expect(bowling.getScore()).to.equal("frame: 4,5 -- total: 14");
            forceSpare(6);
            expect(bowling.getScore()).to.equal("frame: 6,/ -- total: 24");
            bowling.roll(2);
            expect(bowling.getScore()).to.equal("frame: 2,? -- total: 24");
            bowling.roll(3);
            expect(bowling.getScore()).to.equal("frame: 2,3 -- total: 31");
        });
        
        it('accumulates two spares in a row', () => {
            bowling.roll(1);
            bowling.roll(4);
            bowling.roll(4);
            bowling.roll(5);
            forceSpare(6);
            expect(bowling.getScore()).to.equal("frame: 6,/ -- total: 24");
            forceSpare(5);
            expect(bowling.getScore()).to.equal("frame: 5,/ -- total: 39");
        });
    });
    
    describe("strike cases", () => {
        it('accounts for a strike frame', () => {
            bowling.roll(10);
            expect(bowling.getScore()).to.equal("frame: X -- total: 10");
        });
        
        it('accounts for a regular frame followed by a strike frame', () => {
            bowling.roll(2);
            bowling.roll(5);
            bowling.roll(10);
            expect(bowling.getScore()).to.equal("frame: X -- total: 17");
        });
        
        it('accounts for a regular frame after a strike frame', () => {
            bowling.roll(2);
            bowling.roll(5);
            bowling.roll(10);
            expect(bowling.getScore()).to.equal("frame: X -- total: 17");
            bowling.roll(1);
            bowling.roll(8);
            expect(bowling.getScore()).to.equal("frame: 1,8 -- total: 35");
        });
    });
});