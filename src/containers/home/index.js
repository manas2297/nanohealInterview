import React, { useState, useEffect } from 'react'
import { push } from 'connected-react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { DatePicker, Button, Pagination, Row, Col} from 'antd';
import './home.css'
// import {ReactComponent as PoliceLogo} from '../../police.svg';
import Header from '../../components/Header'
import InputFiled from '../../components/Input'
import Cards from '../../components/Cards';
import { getCases } from './actions';
import DatePickerComponent from '../../components/DatePickerComponent';
import { getUnixTime } from '../../utils/common';
import ErrorComponent from '../../components/ErrorComponent';
const Home = props => {
  const { isIncidentsFetched, incidents, isError } = props;
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState('');
  const [toDate, setToDate] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [cases, setCases] = useState(incidents || []);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const [currentPage, setCurrentPage] = useState()
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

  const handleOnPageChange = (page, pageSize) => {
    console.log(page, pageSize);
    const minPageEle = (page-1)*pageSize;
    setMinValue(minPageEle);
    const maxPageEle = page*pageSize;
    if(maxPageEle > cases.length) {
      setMaxValue(cases.length);
    } else {
      setMaxValue(maxPageEle);
    }
  }
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
    if(toDate || fromDate || searchKey) {
      setLoading(true);
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
    const x = cases.slice(minValue, maxValue).map((item, index) => (
      <Col lg={16} sm={20} md={18}>
        <Cards data={item} key={index}/>
      </Col>
      
    ));
    return x;
  };
  const Empty = (
    <h2>No Results</h2>
  );
  return (
    <div className="home">
      <Row justify="center">
        <Header/>
      </Row>
      <Row justify="center">
        {FilterComponent}
      </Row>
      <Row justify="center">
      <p>Total : {cases.length}</p>
      </Row>
      <Row justify="center">
        {isError ? 
          <ErrorComponent/>
          : 
              loading ? 
                'Loading .....'
                : cases.length > 0
                ? TheftCards()
                  : (Empty)
              
            
        }  
      </Row>
      
      
      <Row justify="center">
        <div className="home__pagination">
          <Pagination 
          defaultCurrent={1} 
          total={cases.length}
          showTotal={total => `Total ${total} items`}
          onChange={handleOnPageChange}
          />
        </div>
      </Row>
      
    </div>
  )
  
}

const mapStateToProps = state => ({
  incidents: state.caseState.incidents,
  isIncidentsFetched: state.caseState.isIncidentsFetched,
  isError: state.caseState.isError,
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
