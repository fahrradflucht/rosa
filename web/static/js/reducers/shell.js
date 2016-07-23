const initialState = {
    toggled: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'TOGGLE_SIDENAV':
            return Object.assign({}, state, {toggled: !state.toggled});
        default:
            return state;
    }
};