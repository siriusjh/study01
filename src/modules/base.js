import { createAction, handleActions } from 'redux-actions';
import { Map } from 'immutable';

const CHANE_STEPS = 'base/CHANE_STEPS';
const FINISHED_STEP_ONE = 'base/FINISHED_STEP_ONE';
const FINISHED_STEP_TWO = 'base/FINISHED_STEP_TWO';


export const changeSteps = createAction(CHANE_STEPS);
export const finishedStepOne = createAction(FINISHED_STEP_ONE);
export const finishedStepTwo = createAction(FINISHED_STEP_TWO);


const initialState = Map({
    step: 1,
    stepOneFinished: false,
    stepTwoFinished: false,
    stepThreeFinished: false

})

export default handleActions({
    [CHANE_STEPS] : (state, action) => state.set('step', action.payload),
    [FINISHED_STEP_ONE] : (state, action) => state.set('stepOneFinished', action.payload),
    [FINISHED_STEP_TWO] : (state, action) => state.set('stepTwoFinished', action.payload)
}, initialState)