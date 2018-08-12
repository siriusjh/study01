import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const CHANE_STEPS = 'base/CHANE_STEPS';

export const changeSteps = createAction(CHANE_STEPS);

const initialState = Map({
    step: 1
})

export default handleActions({
    [CHANE_STEPS] : (state, action) => state.set('step', action.payload)
}, initialState)