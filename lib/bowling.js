const debug = require('debug')('bowling');
const createFrame = require('./frame');

const MAX = 10;

module.exports = () => {
    const rolls = [...new Array(MAX).keys()].map((index) => createFrame(index));
    let frameIndex = 0;

    const dragBonus = (frame, index) => {
        const next = rolls[index + 1];
        next && next.applyBonus(frame.getState());
        return frame;
    };

    const calculateTotal = () => rolls
        .filter(frame => frame.isComplete())
        .map(dragBonus)
        .map((frame, index) => frame.calculateValue(index))
        .reduce((total, current) => current + total, 0);
    
    const roll = (pins) => {
        if (rolls[frameIndex].isComplete()) frameIndex++;
        debug(`Accounting ${pins} pins for frame ${frameIndex + 1}`);
        rolls[frameIndex].account(pins);
    };

    const getScore = () => {
        debug(`Getting score for current frame ${frameIndex + 1}`);
        const frameScore = rolls[frameIndex];
        return `frame: ${frameScore.render()} -- total: ${calculateTotal()}`;
    };

    return {
        roll,
        getScore,
    };
};