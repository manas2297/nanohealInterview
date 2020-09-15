import moment from 'moment';
export const getUnixTime = (date) => {
  const unixTime = moment.utc(date).valueOf();
  return unixTime;
}