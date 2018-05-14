const { change, changeName } = require('../redux-utils/index');

const Technique = (state = {}, action) => 
    action.TechniqueName === state.TechniqueName ? ({
        TechniqueName: changeName('TECHNIQUE')(state.TechniqueName, action),
        Function: change('FUNCTION', 'LOCATION')(state.Function, action)
    }) : state;

module.exports = {
    Technique
};