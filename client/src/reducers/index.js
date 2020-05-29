  
import { combineReducers } from 'redux';
import errorReducer from './errorReducer';
import authReducer from './authReducer';
import barsReducer from './barsReducer';
import adminReducer from './adminReducer'

export default combineReducers({
  error: errorReducer,
  auth: authReducer,
  bars: barsReducer,
  admin: adminReducer
});