import * as constants from './constants/users';

const initialState = {
  error: false,
  loading: false,
  users: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_USERS:
      return {
        ...state,
        error: false,
        loading: true,
      };

    case constants.LOAD_USERS_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        users: [
          ...state.users,
          ...action.data,
        ],
      };

    case constants.LOAD_USERS_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
}
