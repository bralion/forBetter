/**
 * canvas reducer
 * create time: 2019/3/26
 */

const DEFALT_STATE = {
    auth:{
        isAdministrator: false,
        authMap: {}
    }
};

export default (state = DEFALT_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case 'AUTH_INIT':{
            let auth = payload || {};
            state.auth = {...auth}
            return {...state};
        }
        default: {
            return state;
        }
    }
};
