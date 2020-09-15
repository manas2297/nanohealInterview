import Axios from "axios";

export const getCasesAPI = async params => {
  console.log(params)
  const url = 'https://bikewise.org:443/api/v2/incidents/';
  const response = await Axios.get(url, {
    params:{
      incident_type: 'theft',
      proximity: 'Berlin',
      query: params.searchKey || '',
      occurred_before: params.toDate || '',
      occurred_after: 'dsadad',
    }
  });
  const isSuccess = response.status >= 200 && response.status < 300;
  if (isSuccess) {
    return response.data;
  }
  const error = new Error('Something went wrong');
  throw error;
}