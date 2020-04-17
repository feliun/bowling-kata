module.exports = () => {
    const rolls = [];
    const roll = () => {};
    const getScore = () => {
        return "frame: ?,?  --  total: 0";
    };

    return {
        roll,
        getScore,
    };
};