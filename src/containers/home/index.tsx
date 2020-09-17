import React, { useState, useEffect } from "react";
import { push } from "connected-react-router";
import { bindActionCreators, Dispatch } from "redux";
import { connect } from "react-redux";
import { DatePicker, Button, Pagination, Row, Col } from "antd";
import "./home.css";
// import {ReactComponent as PoliceLogo} from '../../police.svg';
import Header from "../../components/Header";
import InputFiled from "../../components/Input";
import Cards from "../../components/Cards";
import { getCases } from "./actions";
import DatePickerComponent from "../../components/DatePickerComponent";
import { getUnixTime, debounce } from "../../utils/common";
import ErrorComponent from "../../components/ErrorComponent";
import { Moment } from "moment";
import { CardData } from "../../components/Cards/propTypes";
import { CaseState } from "../../store/types";
import { Incident } from "./incidentTypes";

const mapStateToProps = (state: { caseState: CaseState }) => ({
  incidents: state.caseState.incidents,
  isIncidentsFetched: state.caseState.isIncidentsFetched,
  isError: state.caseState.isError,
});
const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators(
    {
      getCases,
    },
    dispatch
  );
type HomeProps = ReturnType<typeof mapStateToProps> &
  ReturnType<typeof mapDispatchToProps>;
const Home: React.FC<HomeProps> = (props) => {
  const { isIncidentsFetched, incidents, isError } = props;
  const [loading, setLoading] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [toDate, setToDate] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [cases, setCases] = useState(incidents || []);
  const [minValue, setMinValue] = useState(0);
  const [maxValue, setMaxValue] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    const params: Incident = {
      toDate,
      fromDate,
      searchKey,
    };
    props.getCases(params);
    setLoading(true);
  }, []);

  useEffect(() => {
    if (isIncidentsFetched) {
      setLoading(false);
      setCases([...incidents]);
    }
  }, [isIncidentsFetched, incidents]);

  const handleOnPageChange = (page: number, pageSize?: number) => {
    if (pageSize) {
      setCurrentPage(page);
      const minPageEle = (page - 1) * pageSize;
      setMinValue(minPageEle);
      const maxPageEle = page * pageSize;
      if (maxPageEle > cases.length) {
        setMaxValue(cases.length);
      } else {
        setMaxValue(maxPageEle);
      }
    }
  };
  const onDateChange = (
    fieldName: string,
    date: Moment | null,
    dateString: string
  ) => {
    const unixTime = getUnixTime(date);
    if (fieldName === "start") {
      setFromDate(unixTime);
    } else {
      setToDate(unixTime);
    }
  };

  const fetchCases = () => {
    if (toDate || fromDate || searchKey) {
      setLoading(true);
      setCases([]);
      const params = {
        toDate,
        fromDate,
        searchKey,
      };
      props.getCases(params);
    } else {
      alert("Select Filters");
    }
  };

  const goto: (position: string) => void = (position) => {
    if (position === "First") {
      setMinValue(0);
      setMaxValue(10);
      setCurrentPage(1);
    } else {
      debugger;
      let pageNumber: number = Math.floor(cases.length / 10);
      setMinValue(pageNumber * 10);
      if (cases.length % 10 !== 0) {
        setMaxValue((pageNumber + 1) * 10);
      } else {
        setMaxValue(pageNumber * 10 + (cases.length % 10));
      }
      setCurrentPage(pageNumber + 1);
    }
  };
  const handleSearch = debounce((text: string) => {
    setSearchKey(text);
    const params: Incident = {
      searchKey: text,
    };
    props.getCases(params);
    goto("First");
  }, 500);
  const FilterComponent = (
    <>
      <div className="home__filters">
        <InputFiled
          placeholder="Search case descriptions"
          wrapperStyle="home__search"
          onChange={(e: any) => handleSearch(e.target.value)}
        />
        <p>From:</p>
        <DatePickerComponent
          wrapperClass="home__datepicker"
          name="start"
          onChange={(date: Moment | null, dateString: string) =>
            onDateChange("start", date, dateString)
          }
        />
        <p>To:</p>
        <DatePickerComponent
          wrapperClass="home__datepicker"
          name="end"
          onChange={(date, dateString) => onDateChange("end", date, dateString)}
        />
        <Button type="primary" className="findcase" onClick={fetchCases}>
          Find cases
        </Button>
      </div>
    </>
  );
  const TheftCards = () => {
    const x = cases.slice(minValue, maxValue).map((value, index) => (
      <Col lg={16} sm={20} md={18}>
        <Cards data={value} key={index} />
      </Col>
    ));
    return x;
  };
  const Empty = <h2>No Results</h2>;
  return (
    <div className="home">
      <Row justify="center">
        <Header />
      </Row>
      <Row justify="center">{FilterComponent}</Row>
      <Row justify="center">
        <p>Total : {cases.length}</p>
      </Row>
      <Row justify="center">
        {isError ? (
          <ErrorComponent />
        ) : loading ? (
          "Loading ....."
        ) : cases.length > 0 ? (
          TheftCards()
        ) : (
          Empty
        )}
      </Row>

      <Row justify="center">
        <div className="home__pagination">
          <Button
            type="default"
            disabled={currentPage === 1}
            onClick={() => goto("First")}
          >
            First
          </Button>
          <Pagination
            defaultCurrent={1}
            total={cases.length}
            onChange={handleOnPageChange}
            pageSize={10}
            current={currentPage}
          />
          <Button
            type="default"
            disabled={cases.length <= 10}
            onClick={() => goto("Last")}
          >
            Last
          </Button>
        </div>
      </Row>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
