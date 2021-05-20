export const initialState = {
  inform: null,
  user: null,
  loading: false,
  signup: false,
};

export const USER_CREATOR_INFORM_REQUEST = 'USER_CREATOR_INFORM_REQUEST';
export const USER_CREATOR_INFORM_SUCCESS = 'USER_CREATOR_INFORM_SUCCESS';
export const USER_CREATOR_INFORM_FAILURE = 'USER_CREATOR_INFORM_FAILURE';

export const USER_INFORM_REQUEST = 'USER_INFORM_REQUEST';
export const USER_INFORM_SUCCESS = 'USER_INFORM_SUCCESS';
export const USER_INFORM_FAILURE = 'USER_INFORM_FAILURE';

export const USER_DEL_INFORM_REQUEST = 'USER_DEL_INFORM_REQUEST';
export const USER_DEL_INFORM_SUCCESS = 'USER_DEL_INFORM_SUCCESS';
export const USER_DEL_INFORM_FAILURE = 'USER_DEL_INFORM_FAILURE';

export const USER_LOGIN_REQUEST = 'USER_LOGIN_REQUEST';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_INFORM_REQUEST:
      return {
        ...state,
        loading: true,
        signup: false,
      }
    case USER_INFORM_SUCCESS:
      return {
        ...state,
        user: action.data,
        loading: false,
        signup: false,
      }
    case USER_INFORM_FAILURE:
      return {
        ...state,
        loading: false,
        signup: false,
      }
    case USER_CREATOR_INFORM_REQUEST:
      return {
        ...state,
        loading: true,
        signup: false,
      }
    case USER_CREATOR_INFORM_SUCCESS:
      return {
        ...state,
        inform: action.data,
        loading: false,
        signup: false,
      }
    case USER_CREATOR_INFORM_FAILURE:
      return {
        ...state,
        loading: false,
        signup: false,
      }
    case USER_DEL_INFORM_REQUEST:
      return {
        ...state,
        loading: true,
        signup: false,
      }
    case USER_DEL_INFORM_SUCCESS:
      return {
        ...state,
        user: action.data,
        inform: action.data,
        loading: false,
        signup: false,
      }
    case USER_DEL_INFORM_FAILURE:
      return {
        ...state,
        loading: false,
        signup: false,
      }
    case USER_LOGIN_REQUEST:
      return {
        ...state,
        loading: true,
        signup: false,
      }
    case USER_LOGIN_SUCCESS:
      return {
        ...state,
        user: action.data,
        loading: false,
        signup: false,
      }
    case USER_LOGIN_FAILURE:
      return {
        ...state,
        loading: false,
        signup: true,
      }
    default:
      return state;
  }
}

export default reducer;