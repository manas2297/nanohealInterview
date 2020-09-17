import { Incident } from "./incidentTypes";
import { CaseActionTypes, GET_CASE_START } from "./types";

export function getCases(params:Incident): CaseActionTypes{
  return {
    type: GET_CASE_START,
    payload: params,
  }
};