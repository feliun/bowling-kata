module.exports = () => {
    const rolls = new Array(10).fill([], 0, 9);
    let currentFrame = 0;
    let total = 0;

    const calculateTotal = () => {
        return total;
    };

    const renderFrame = ([ first = '?', second = '?']) => {
        return `${first},${second}`;
    };
    
    const roll = (pins) => {
        rolls[currentFrame].push(pins);
    };

    const getScore = () => {
        const frameScore = rolls[currentFrame];
        return `frame: ${renderFrame(frameScore)} -- total: ${calculateTotal()}`;
    };

    return {
        roll,
        getScore,
    };
};