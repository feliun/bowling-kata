const debug = require('debug')('bowling:frame');

module.exports = () => {
    let rolls = [ undefined, undefined ];
    let getLimit = () => rolls.length;
    let index = 0;

    const getRegularPoints = () => { // non-extra regular points
        const length = rolls.length;
        return [ rolls[length - 2], rolls[length - 1] ];
    };

    const isStrike = () => {
        const [ first ] = getRegularPoints();
        return first === 10;
    };
    
    const isSpare = () => {
        const [ first, second ] = getRegularPoints();
        return !isStrike() && (first + second) === 10;
    };
    
    const isFilled = () => index === getLimit();
    
    const isComplete = () => isStrike() || isSpare() || isFilled();

    const calculations = {
        strike: () => 0,
        spare: () => 0,
        regular: () => {
            const [ first = 0, second ] = getRegularPoints();
            return second ? first + second : 0;
        },
    };

    const render = () => {
        const [ first = '?', second = '?'] = getRegularPoints();
        if (isStrike()) return 'X';
        if (isSpare()) return `${first},/`;
        return `${first},${second}`;
    };

    const account = (pins) => {
        rolls[index] = pins;
        index++;
        debug(`Current rolls: ${render()}`);
    };

    const calculateValue = () => {
        if (isStrike()) return calculations.strike();
        if (isSpare()) return calculations.spare();
        return calculations.regular();
    };

    const addExtraRoll = extra => {
        rolls = rolls.concat(new Array(extra).fill(undefined));
    };

    return {
        isComplete,
        calculateValue,
        account,
        render,
        addExtraRoll,
    };

};