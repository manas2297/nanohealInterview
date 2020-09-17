import { CaseState } from "../../store/types";
import { CaseActionTypes, GET_CASE_START, GET_CASE_SUCCESS, GET_CASE_FAILED } from "./types";

const initialState : CaseState = {
  incidents:[],
  isIncidentsFetched: false,
  isError: false,
}

export default (state = initialState, action: CaseActionTypes) => {
  switch (action.type) {

    case GET_CASE_START:
      return {
        ...state,
        isIncidentsFetched: false,
        isError: false,
      }
    case GET_CASE_SUCCESS:
      return {
        ...state,
        incidents: [...action.payload.incidents],
        isIncidentsFetched: true,
      };
    case GET_CASE_FAILED:
      return {
        ...state,
        isIncidentsFetched: true,
        isError: true,
      }
    default:
      return state
  }
}