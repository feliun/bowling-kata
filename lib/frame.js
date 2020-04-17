const debug = require('debug')('bowling:frame');

module.exports = (order) => {
    const rolls = [];

    const isStrike = () => {
        const [ first ] = rolls;
        return first === 10;
    };
    
    const isSpare = () => {
        const [ first, second ] = rolls;
        return second && (first + second) === 10;
    };
    
    const isFilled = () => {
        const [ first, second ] = rolls;
        return first && second;
    };
    
    const isComplete = () => isStrike() || isSpare() || isFilled();

    const calculations = {
        strike: () => 0,
        spare: () => 0,
        regular: () => {
            const [ first = 0, second ] = rolls;
            return second ? first + second : 0;
        },
    };

    const render = () => {
        const [ first = '?', second = '?'] = rolls;
        if (isStrike()) return `,X`;
        if (isSpare()) return `${first},/`;
        return `${first},${second}`;
    };

    const account = (pins) => {
        rolls.push(pins);
        debug(`Current rolls: ${render()}`);
    };

    const calculateValue = () => {
        if (isStrike()) return calculations.strike();
        if (isSpare()) return calculations.spare();
        return calculations.regular();
    };

    return {
        isComplete,
        calculateValue,
        account,
        render,
    };

};