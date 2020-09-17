import { put, all, call, takeLatest } from "redux-saga/effects";
import { getCasesAPI } from "../api/api.cases";
import { GET_CASE_START, GET_CASE_SUCCESS, GET_CASE_FAILED } from "../containers/home/types";

export const loadSaga = () => {
    console.log("Sagas!");
};
export function* getCasesSaga(action) {
    try {
        const params = action.payload;
        const responseBody = yield call(getCasesAPI, params);
        yield put({
            type: GET_CASE_SUCCESS,
            payload: responseBody,
        });
    } catch (e) { 
        yield put({
            type: GET_CASE_FAILED,
        })
    }
}

export function* watchCaseSaga(){
    yield takeLatest(GET_CASE_START, getCasesSaga);
}

export default function* rootSaga() {
    yield all([loadSaga(), watchCaseSaga()]);
}
