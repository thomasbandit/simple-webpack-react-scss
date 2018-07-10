import { combineReducers } from 'redux';
import userProfile from './userProfile';
import users from './users';

const rootReducer = combineReducers({
  userProfile,
  users,
});

export default rootReducer;
