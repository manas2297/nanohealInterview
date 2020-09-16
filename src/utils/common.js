import moment from 'moment';
export const getUnixTime = (date) => {
  const unixTime = date.unix()
  return unixTime;
}

export const getDateFromUnix = (value) => {
  const date = moment(value*1000).format("dddd, MMMM Do YYYY");
  return date;
}

export const debounce = (fn, delay) => {
  let timeout;
  return function execute(...args){
    const later = () => {
      clearTimeout(timeout);
      fn(...args);
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);
  }
}