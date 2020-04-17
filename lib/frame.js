const debug = require('debug')('bowling:frame');

module.exports = (order) => {
    const rolls = [];

    const isStrike = ([ first ]) => first === 10;
    const isSpare = ([ first, second ]) => second && (first + second) === 10;
    const isFilled = ([ first, second ]) => first && second;
    const isComplete = () => isStrike(rolls) || isSpare(rolls) || isFilled(rolls);

    const calculations = {
        strike: () => 0,
        spare: () => 0,
        regular: ([ first = 0, second ]) => second ? first + second : 0,
    };

    const render = () => {
        const [ first = '?', second = '?'] = rolls;
        if (isStrike([first, second])) return `,X`;
        if (isSpare([first, second])) return `${first},/`;
        return `${first},${second}`;
    };

    const account = (pins) => {
        rolls.push(pins);
        debug(`Current rolls: ${render()}`);
    };

    const calculateValue = (index) => {
        if (isStrike(rolls)) return calculations.strike(rolls, index);
        if (isSpare(rolls)) return calculations.spare(rolls, index);
        return calculations.regular(rolls);
    };

    return {
        isComplete,
        calculateValue,
        account,
        render,
    };

};