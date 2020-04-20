const debug = require('debug')('bowling:frame');

module.exports = () => {
    const rolls = [];

    const calculations = {
        strike: () => {
            debug('Applying calculation with the strike bonus');
            const [ first = 0, second = 0 ] = rolls;
            return (first + second) * 2;
        },
        spare: () => {
            debug('Applying calculation with the spare bonus');
            const [ first = 0, second = 0 ] = rolls;
            return (first * 2) + second;
        },
        regular: () => {
            debug('Applying regular calculation');
            const [ first = 0, second = 0 ] = rolls;
            return first + second;
        },
    };

    let calculation = calculations.regular;

    const isStrike = () => {
        const [ first ] = rolls;
        return first === 10;
    };
    
    const isSpare = () => {
        const [ first, second ] = rolls;
        return !isStrike() && (first + second) === 10;
    };
    
    const isFilled = () => {
        const [ first, second ] = rolls;
        return first && second;
    };
    
    const isComplete = () => isStrike() || isSpare() || isFilled();

    const render = () => {
        const [ first = '?', second = '?'] = rolls;
        if (isStrike()) return `X`;
        if (isSpare()) return `${first},/`;
        return `${first},${second}`;
    };

    const account = (pins) => {
        rolls.push(pins);
        debug(`Current rolls: ${render()}`);
    };

    const calculateValue = () => {
        debug(`Calculating value for rolls: ${rolls}`);
        return calculation();
    }

    const applyBonus = type => {
        debug(`Applying bonus of type ${type}`);
        calculation = calculations[type] || calculations.regular;
    };

    const getState = () => {
        if (isSpare()) return 'spare';
        if (isStrike()) return 'strike';
        return 'regular';
    };

    return {
        isComplete,
        calculateValue,
        account,
        render,
        applyBonus,
        getState,
    };

};