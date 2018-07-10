import * as constants from './constants/userProfile';

const initialState = {
  error: false,
  loading: false,
  data: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case constants.LOAD_USER_PROFILE:
      return {
        ...state,
        error: false,
        loading: true,
      };

    case constants.LOAD_USER_PROFILE_SUCCESS:
      return {
        ...state,
        error: false,
        loading: false,
        data: action.data,
      };

    case constants.LOAD_USER_PROFILE_FAIL:
      return {
        ...state,
        error: true,
        loading: false,
      };

    default:
      return state;
  }
}
