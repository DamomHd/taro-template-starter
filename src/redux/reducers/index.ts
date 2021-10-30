import { combineReducers } from 'redux';
import counter from './counter';
import tempData from './tempData';


export default combineReducers({
  counter,
  tempData
});
