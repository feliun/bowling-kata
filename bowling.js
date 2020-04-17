const debug = require('debug')('bowling');

module.exports = () => {
    const rolls = new Array(10).fill([], 0, 9);
    let frameIndex = 0;

    const renderFrames = () => `[${rolls.reduce((total, current) => {
        return `${total}[${renderFrame(current)}],`;
    }, '')}]`;

    const calculateFrameValue = ([ first, second ]) => {
        if (!second) return 0;
        return first + second;
    };

    const calculateTotal = () => rolls.reduce(
        (total, currentFrame) => total + calculateFrameValue(currentFrame)
    , 0);

    const renderFrame = ([ first = '?', second = '?']) => {
        return `${first},${second}`;
    };
    
    const roll = (pins) => {
        rolls[frameIndex] = rolls[frameIndex].concat(pins);
        debug(`Current rolls: ${renderFrames()}`);
    };

    const getScore = () => {
        const frameScore = rolls[frameIndex];
        return `frame: ${renderFrame(frameScore)} -- total: ${calculateTotal()}`;
    };

    return {
        roll,
        getScore,
    };
};