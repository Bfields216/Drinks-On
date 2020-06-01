  
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import userReducer from './userReducer';
import barsReducer from './barsReducer';
import adminReducer from './adminReducer'

export default combineReducers({
  error: errorReducer,
  user: userReducer,
  bars: barsReducer,
  admin: adminReducer
});