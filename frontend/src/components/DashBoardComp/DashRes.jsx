import React, { useState } from 'react'
import { Col, Form, Row } from 'react-bootstrap'

import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css'
import Moment from 'moment'
import DashResDaily from './DashResDaily'
import DashResMonthly from './DashResMonthly'

const DashRes = ({ restaurant }) => {
  const [selectMonth, setSelectMonth] = useState()
  const thisMonth = Moment().format('MM')

  const [selectDate, setSelectDate] = useState(new Date())
  const [showCalendar, setShowCalendar] = useState(false)

  const [showMonth, setShowMonth] = useState(false)

  return ( 
    <div>
      <div className='hi-section'>
        <p className='paragraph'>
          Quản lý nhà hàng <strong>{restaurant.name}</strong>
        </p>
      </div>
      <Row className='time-section mb-3'>
        <Col className='day-section'>
          <span className='me-3'>Xem tình hình doanh thu theo ngày</span>

          <button
            className='light-btn'
            onClick={() => {
              setShowCalendar(!showCalendar)
            }}
          >
            {Moment(selectDate).format('DD-MM-YYYY')}
          </button>
          <Calendar
            className={`calendar ${showCalendar ? '' : 'hidden'}`}
            onChange={(e) => {
              setSelectDate(e)
              setShowCalendar(!showCalendar)
              setShowMonth(false)
            }}
          />
        </Col>
        <Col className='month-section'>
          <Form.Group as={Col} controlId='formBasicSelect'>
            <Form.Label className='me-3'>
              Xem tình hình doanh thu theo tháng
            </Form.Label>
            <Form.Select
              style={{ display: 'inline-block', width: 'inherit' }}
              defaultValue={thisMonth}
              value={selectMonth}
              onChange={(e) => {
                setSelectMonth(e.target.value)
                setShowMonth(true)
              }}
            >
              <option value='01'>Thang 01</option>
              <option value='02'>Thang 02</option>
              <option value='03'>Thang 03</option>
              <option value='04'>Thang 04</option>
              <option value='05'>Thang 05</option>
              <option value='06'>Thang 06</option>
              <option value='07'>Thang 07</option>
              <option value='08'>Thang 08</option>
              <option value='09'>Thang 09</option>
              <option value='10'>Thang 10</option>
              <option value='11'>Thang 11</option>
              <option value='12'>Thang 12</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>
      {showMonth ? <DashResMonthly /> : <DashResDaily />}
      <div className='most-order-section'>
        <p className='paragraph'>Các món được gọi nhiều nhất trong tháng</p>
      </div>
    </div>
  )
}

export default DashRes
