import { LOGOUT_USER, USER_LOGIN, REFRESH_USER, LOAD_USERS, LOAD_TECHNOLOGIES, LOAD_INDUSTRIES, USER_CREATE, UPDATE_CURRENT_USER } from './types';

const initialState = {
    isAuth: false,
    token: null,
    user: {},
    users: [],
    technologies: [],
    industries: [],
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) { 
        case USER_LOGIN: 
            return { ...state, token: action.token, user: action.user, isAuth: !!action.token };
        case REFRESH_USER: 
            return { ...state, token: action.token, user: action.user, isAuth: !!action.token };
        case LOGOUT_USER:
            return { ...state, token: action.token, user: action.user, isAuth: false };
        case LOAD_USERS:
            return { ...state, users: action.users }
        case USER_CREATE:
            return { ...state, users: [...state.users, action.newUser] }
        case LOAD_TECHNOLOGIES:
            return { ...state, technologies: action.technologies }
        case LOAD_INDUSTRIES:
            return { ...state, industries: action.industries }
        case UPDATE_CURRENT_USER:
            const { updatedUser: { form } } = action
            return { ...state, user: form }
        default: return state
    }
}
