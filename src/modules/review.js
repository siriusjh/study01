import {createAction, handleActions} from 'redux-actions';
import {Map} from 'immutable';


const UPDATE_TRAFFIC_TEXT_LENGTH = 'review/UPDATE_TRAFFIC_TEXT_LENGTH';
const CHANGE_TRAFFIC_FINISHED = 'review/CHANGE_TRAFFIC_FINISHED';
const UPDATE_ENVIRONMENT_TEXT_LENGTH = 'review/UPDATE_ENVIRONMENT_TEXT_LENGTH';
const CHANGE_ENVIRONMENT_FINISHED = 'review/CHANGE_ENVIRONMENT_FINISHED';
const CHANGE_DANJI_FINISHED = 'review/CHANGE_DANJI_FINISHED';
const UPDATE_RESIDENCE_TYPE = 'review/UPDATE_RESIDENCE_TYPE';
const UPDATE_RESIDENCE_YEAR = 'review/UPDATE_RESIDENCE_YEAR';
const UPDATE_AGE = 'review/UPDATE_AGE';
const UPDATE_GENDER = 'review/UPDATE_GENDER';
const UPDATE_MARRIED = 'review/UPDATE_MARRIED';
const UPDATE_DONG = 'review/UPDATE_DONG';
const SET_FLOORS = 'review/SET_FLOORS';
const UPDATE_FLOOR = 'review/UPDATE_FLOOR';
const CHANGE_FLOOR_TYPE = 'review/CHANGE_FLOOR_TYPE';


export const updateTrafficTextLength = createAction(UPDATE_TRAFFIC_TEXT_LENGTH);
export const changeTrafficFinished = createAction(CHANGE_TRAFFIC_FINISHED);
export const updateEnvironmentTextLength = createAction(UPDATE_ENVIRONMENT_TEXT_LENGTH);
export const changeEnvironmentFinished = createAction(CHANGE_ENVIRONMENT_FINISHED);
export const changeDanjiFinished = createAction(CHANGE_DANJI_FINISHED);
export const updateResidenceType = createAction(UPDATE_RESIDENCE_TYPE);
export const updateResidenceYear = createAction(UPDATE_RESIDENCE_YEAR);
export const updateAge = createAction(UPDATE_AGE);
export const updateGender = createAction(UPDATE_GENDER);
export const updateMarried = createAction(UPDATE_MARRIED);
export const updateDong = createAction(UPDATE_DONG);
export const setFloors = createAction(SET_FLOORS);
export const updateFloor = createAction(UPDATE_FLOOR);
export const changeFloorType = createAction(CHANGE_FLOOR_TYPE);


const initialState = Map({
    trafficTextLength: 0,
    trafficFinished: false,
    environmentTextLength: 0,
    environmentFinished: false,
    danjiFinished: false,
    residenceType: '',
    residenceYear: '',
    age: '',
    gender: '',
    isMarried: '',
    dongInfo: '',
    floors: [],
    floorInfo: '',
    noFloor: false
})


export default handleActions({
    [UPDATE_TRAFFIC_TEXT_LENGTH]: (state, action) => state.set('trafficTextLength', action.payload),
    [CHANGE_TRAFFIC_FINISHED]: (state, action) => state.set('trafficFinished', action.payload),
    [UPDATE_ENVIRONMENT_TEXT_LENGTH]: (state, action) => state.set('environmentTextLength', action.payload),
    [CHANGE_ENVIRONMENT_FINISHED]: (state, action) => state.set('environmentFinished', action.payload),
    [CHANGE_DANJI_FINISHED] : (state, action) => state.set('danjiFinished', action.payload),
    [UPDATE_RESIDENCE_TYPE]: (state, action) => state.set('residenceType', action.payload),
    [UPDATE_RESIDENCE_YEAR]: (state, action) => state.set('residenceYear', action.payload),
    [UPDATE_AGE]: (state, action) => state.set('age', action.payload),
    [UPDATE_GENDER]: (state, action) => state.set('gender', action.payload),
    [UPDATE_MARRIED]: (state, action) => state.set('isMarried', action.payload),
    [UPDATE_DONG]: (state, action) => state.set('dongInfo', action.payload),
    [SET_FLOORS] : (state, action) => state.set('floors', action.payload),
    [UPDATE_FLOOR]: (state, action) => state.set('floorInfo', action.payload),
    [CHANGE_FLOOR_TYPE]: (state, action) => state.set('noFloor', action.payload)
}, initialState)