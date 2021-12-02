import React from 'react';
import { Col, Form, Row, FloatingLabel } from 'react-bootstrap';

export default function SeparatedDateInput({
  yearChangeFormHandler,
  monthChangeFormHandler,
  dayChangeFormHandler,
  yearValue,
  monthValue,
  dayValue,
  yearName = "year",
  monthName = "month",
  dayName = "day",

}) {
  const months = [
    "January", 
    "February", 
    "March", 
    "April", 
    "May", 
    "June", 
    "July", 
    "August",
    "September", 
    "October",
    "November",
    "December"
  ];
  // keeping a separate state for frontend validation purposes
  const year = yearValue;
  const month = monthValue;
  const day = dayValue;

  // day=0 wraps to the last day of previous month (hence the +1)
  const monthDays = new Date(year, month+1, 0).getDate();
  const dayOptions = ([...Array(monthDays).keys()])
    .map(day=><option key={day} value={day+1}>{day+1}</option>);
  let monthOptions = months.map(
    (month, index) => (
      <option key={month+index} value={index} >{month}</option>
    )
  );
  return (
    <Row>
      <Form.Group as={Col} md="2" xs="4">
        <FloatingLabel label="Year">
          <Form.Control type="number" value={year} name={yearName} onChange={yearChangeFormHandler}/>  
        </FloatingLabel>
      </Form.Group> 
      <Form.Group as={Col} md="3" xs="4">
        <FloatingLabel label="Month" >
          <Form.Select name={monthName} value={month} onChange={monthChangeFormHandler} placeholder="Months">
            {monthOptions}
          </Form.Select>  
        </FloatingLabel>
      </Form.Group> 
      <Form.Group as={Col} md="2" xs="4">
        <FloatingLabel label="Day">
          <Form.Select name={dayName} value={day} onChange={dayChangeFormHandler}>
            {dayOptions}
          </Form.Select>
        </FloatingLabel>
      </Form.Group>
      
    </Row>
  );
  
}
