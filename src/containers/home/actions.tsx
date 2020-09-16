export function getCases(params){
  console.log("here");
  return {
    type: 'GET_CASES_START',
    payload: params,
  }
};