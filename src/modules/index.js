import { combineReducers } from 'redux';
import base from './base';
import review from './review';

export default combineReducers({
    base,
    review
})