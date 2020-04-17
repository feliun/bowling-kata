const debug = require('debug')('bowling');

const strategies = {
    strikeCalculation: (frame, index) => {
        return 0;
    },
    spareCalculation: (frame, index) => {
        return 0;
    },
    regularCalculation: ([ first = 0, second ]) => second ? first + second : 0,
};

const isStrike = ([ first ]) => first === 10;
const isSpare = ([ first, second ]) => second && (first + second) === 10;
const isComplete = (frame) => {
    return isStrike(frame) || isSpare(frame) || (frame[0] && frame[1]);
};

module.exports = () => {
    const rolls = new Array(10).fill([], 0, 9);
    let frameIndex = 0;

    const renderFrames = () => `[${rolls.reduce((total, current) => {
        return `${total}[${renderFrame(current)}],`;
    }, '')}]`;

    const calculateFrameValue = (index, frame) => {
        if (isStrike(frame)) return strategies.strikeCalculation(frame, index);
        if (isSpare(frame)) return strategies.spareCalculation(frame, index);
        return strategies.regularCalculation(frame);
    };

    const calculateTotal = () => rolls.reduce(
        (total, currentFrame, index) => total + calculateFrameValue(index, currentFrame)
    , 0);

    const renderFrame = ([ first = '?', second = '?']) => {
        if(isStrike([first, second])) return `,X`;
        if(isSpare([first, second])) return `${first},/`;
        return `${first},${second}`;
    };
    
    const roll = (pins) => {
        if (isComplete(rolls[frameIndex])) frameIndex++;
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