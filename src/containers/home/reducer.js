
const initialState = {
  incidents:[],
  isIncidentsFetched: false,
}

export default (state = initialState, action) => {
  switch (action.type) {

    case 'GET_CASE_START':
      return {
        ...state,
        isIncidentsFetched: false,
      }
    case 'GET_CASES_SUCCESS':
      return {
        ...state,
        incidents: [...action.payload.incidents],
        isIncidentsFetched: true,
      };
    case 'GET_CASES_FAILED':
      return {
        ...state,
        isIncidentsFetched: true,
      }
    default:
      return state
  }
}