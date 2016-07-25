const initialState = {
    isFetching: false,
    user: null,
    error: null
};

export default (state = initialState, action) => {
    switch (action.type) {
        case 'REQUEST_SESSION':
            return Object.assign({}, state, {
                isFetching: true
            });
        case 'SET_SESSION_USER':
            return Object.assign({}, state, {
                isFetching: false,
                user: action.user
            });
        case 'SET_SESSION_ERROR':
            return Object.assign({}, state, {
                isFetching: false,
                error: action.error
            });
        case 'DELETE_SESSION':
            return initialState;
        default:
            return state;
    }
};