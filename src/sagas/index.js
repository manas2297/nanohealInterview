import { put, all, call, takeLatest } from "redux-saga/effects";
import { getCasesAPI } from "../api/api.cases";

export const loadSaga = () => {
    console.log("Sagas!");
};
export function* getCasesSaga(action) {
    try {
        const params = action.payload;
        const responseBody = yield call(getCasesAPI, params);
        yield put({
            type: "GET_CASES_SUCCESS",
            payload: responseBody,
        });
    } catch (e) { }
}

export function* watchCaseSaga(){
    yield takeLatest("GET_CASES_START", getCasesSaga);
}

export default function* rootSaga() {
    yield all([loadSaga(), watchCaseSaga()]);
}
