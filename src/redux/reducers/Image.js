const R = require('ramda');
const { media, change } = require('../redux-utils/index');

const Image = (state = {}, action) =>
    action.ImageName === state.ImageName ? ({
        width: change('IMAGE', 'WIDTH', 0)(state.width, action),
        height: change('IMAGE', 'HEIGHT', 0)(state.height, action),
        ...media('IMAGE')(state, action)
    }) : state;

module.exports = {
    Image
};