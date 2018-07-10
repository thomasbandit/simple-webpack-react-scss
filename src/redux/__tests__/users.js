import reducer from '../users';
import * as actions from '../actions/users';
import * as constants from '../constants/users';
// import expect from 'expect';
// import getPostMock from '../mocks/getPostMock';

describe('users reducer', () => {
  it('should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      error: false,
      loading: false,
      users: [],
    });
  });

  it('should handle LOAD_USERS', () => {
    const action = { type: constants.LOAD_USERS };

    expect(reducer({}, action)).toEqual({
      error: false,
      loading: true,
    });
  });

  it('should handle LOAD_USERS_SUCCESS', () => {
    const action = {
      type: constants.LOAD_USERS_SUCCESS,
      data: [],
    };

    expect(reducer({
      error: false,
      loading: true,
      users: [],
    }, action)).toEqual({
      error: false,
      loading: false,
      users: [],
    });
  });

  it('should handle LOAD_USERS_FAIL', () => {
    const action = {
      type: constants.LOAD_USERS_FAIL,
    };

    expect(reducer({
      error: false,
      loading: true,
      users: [],
    }, action)).toEqual({
      error: true,
      loading: false,
      users: [],
    });
  });
});
