import { Incident } from "./incidentTypes";
import { CardData } from "../../components/Cards/propTypes";

export const GET_CASE_START = 'GET_CASE_START';
export const GET_CASE_SUCCESS = 'GET_CASE_SUCCESS';
export const GET_CASE_FAILED = 'GET_CASE_FAILED';

interface GetCaseStart{
  type: typeof GET_CASE_START,
  payload: Incident,
};
interface GetCaseSuccess{
  type: typeof GET_CASE_SUCCESS,
  payload: { incidents : Array<CardData>},
};
interface GetCaseFailed{
  type: typeof GET_CASE_FAILED,
  payload?:string, 
}

export type CaseActionTypes = GetCaseFailed | GetCaseStart | GetCaseSuccess;