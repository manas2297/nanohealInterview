import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DatePicker, Button} from 'antd';
import './home.css'
// import {ReactComponent as PoliceLogo} from '../../police.svg';
import Header from '../../components/Header'
import InputFiled from '../../components/Input'
import Cards from '../../components/Cards';
import { getCases } from './actions';
import DatePickerComponent from '../../components/DatePickerComponent';
import { getUnixTime } from '../../utils/common';
const Home = props => {
  const { isIncidentsFetched, incidents } = props;
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [cases, setCases] = useState(incidents || []);
  console.log(cases);
  useEffect(() => {
    const params = {
      toDate,
      fromDate,
      searchKey,
    };
    props.getCases(params);
    setLoading(true);
  },[]);
  useEffect(() => {
    if(isIncidentsFetched) {
      setLoading(false);
      setCases([...incidents]);
    }
  }, [isIncidentsFetched, incidents]);
  const onDateChange = (fieldName,date, dateString) => {
    const unixTime = getUnixTime(date);
    console.log(fieldName,unixTime, date);
    if(fieldName==='start') {
      setFromDate(unixTime);
    }
    else {
      setToDate(unixTime);
    }
  }

  const fetchCases = () => {
    setLoading(true);
    if(toDate || fromDate || searchKey) {
      const params = {
        toDate,
        fromDate,
        searchKey,
      };
      props.getCases(params)
    } else {
      alert('Select Filters');
    }
    
  };
  const FilterComponent = (
    <>
      <div className="home__filters">
        <InputFiled 
          placeholder="Search case descriptions" 
          wrapperStyle="home__search" 
          
          value={searchKey} 
          onChange={(e) => setSearchKey(e.target.value)}
        />
        <DatePickerComponent
          placeholder="From"
          wrapperClass="home__datepicker"
          name="start"
          onChange={(date,dateString) => onDateChange('start',date, dateString)}
        />
        <DatePickerComponent
          wrapperClass="home__datepicker"
          placeholder="To"
          name="end"
          onChange={(date,dateString) => onDateChange('end',date, dateString)}
        />
        <Button type="primary" className="findcase" onClick={fetchCases}>
          Find cases
        </Button>
      </div>
    </>
  )
  const TheftCards = () => {
    const x = cases.map((item, index) => (
      <Cards data={item} key={index}/>
    ));
    return x;
  };
  return (
    <div className="home">
      <Header/>
      {FilterComponent}
      <div className="theft-cards">
          {loading ? 'Loading .....'
            : 
          
          TheftCards()
          }
      </div>
      {/* <p>
        <button onClick={() => props.changePage()}>
          Go to About
        </button>
      </p> */}
    </div>
  )
  
}

const mapStateToProps = state => ({
  incidents: state.caseState.incidents,
  isIncidentsFetched: state.caseState.isIncidentsFetched,
})
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      getCases,
    },
    dispatch
  )

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home)
