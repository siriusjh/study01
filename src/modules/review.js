import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';


const UPDATE_TRAFFIC_TEXT_LENGTH = 'review/UPDATE_TRAFFIC_TEXT_LENGTH';
const CHANGE_TRAFFIC_FINISHED = 'review/CHANGE_TRAFFIC_FINISHED';
const CHANGE_RESIDENCE_TYPE = 'review/CHANGE_RESIDENCE_TYPE';
const CHANGE_RESIDENCE_YEAR = 'review/CHANGE_RESIDENCE_YEAR';
const CHANGE_AGE = 'review/CHANGE_AGE';
const CHANGE_GENDER = 'review/CHANGE_GENDER';
const CHANGE_MARRIED = 'review/CHANGE_MARRIED';

const UPDATE_RESIDENCE_TYPE = 'review/UPDATE_RESIDENCE_TYPE';
const UPDATE_RESIDENCE_YEAR = 'review/UPDATE_RESIDENCE_YEAR';
const UPDATE_AGE = 'review/UPDATE_AGE';
const UPDATE_GENDER = 'review/UPDATE_GENDER';
const UPDATE_MARRIED = 'review/UPDATE_MARRIED';


export const updateTrafficTextLength = createAction(UPDATE_TRAFFIC_TEXT_LENGTH);
export const changeTrafficFinished = createAction(CHANGE_TRAFFIC_FINISHED);
export const changeResidenceType = createAction(CHANGE_RESIDENCE_TYPE);
export const changeResidenceYear = createAction(CHANGE_RESIDENCE_YEAR);
export const changeAge = createAction(CHANGE_AGE);
export const changeGender = createAction(CHANGE_GENDER);
export const changeMarried = createAction(CHANGE_MARRIED);

export const updateResidenceType = createAction(UPDATE_RESIDENCE_TYPE);
export const updateResidenceYear = createAction(UPDATE_RESIDENCE_YEAR);
export const updateAge = createAction(UPDATE_AGE);
export const updateGender = createAction(UPDATE_GENDER);
export const updateMarried = createAction(UPDATE_MARRIED);


const initialState = Map({
    trafficTextLength: 0,
    trafficFinished: false,
    environmentFinished: false,
    danjiFinished: false,
    residenceTypeFinished: false,
    residenceYearFinished: false,
    ageFinished: false,
    genderFinished: false,
    marriedFinished: false,
    residenceType: '',
    residenceYear: '',
    age: '',
    gender: '',
    isMarried: ''


})


export default handleActions({
    [UPDATE_TRAFFIC_TEXT_LENGTH]: (state, action) => state.set('trafficTextLength', action.payload),
    [CHANGE_TRAFFIC_FINISHED]: (state, action) => state.set('trafficFinished', action.payload),
    [CHANGE_RESIDENCE_TYPE]: (state, action) => state.set('residenceTypeFinished', action.payload),
    [CHANGE_RESIDENCE_YEAR]: (state, action) => state.set('residenceYearFinished', action.payload),
    [CHANGE_AGE]: (state, action) => state.set('ageFinished', action.payload),
    [CHANGE_GENDER]: (state, action) => state.set('genderFinished', action.payload),
    [CHANGE_MARRIED]: (state, action) => state.set('marriedFinished', action.payload),

    [UPDATE_RESIDENCE_TYPE]: (state, action) => state.set('residenceType', action.payload),
    [UPDATE_RESIDENCE_YEAR]: (state, action) => state.set('residenceYear', action.payload),
    [UPDATE_AGE]: (state, action) => state.set('age', action.payload),
    [UPDATE_GENDER]: (state, action) => state.set('gender', action.payload),
    [UPDATE_MARRIED]: (state, action) => state.set('isMarried', action.payload)
}, initialState)