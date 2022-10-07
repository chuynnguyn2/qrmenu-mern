import React, { useRef, useState } from 'react'
import { Col, Overlay, Row, Tooltip } from 'react-bootstrap'

const DashResMonthly = () => {
  const toolt1Ref = useRef(null)
  const [showToolT1, setShowToolT1] = useState(false)
  const toolt2Ref = useRef(null)
  const [showToolT2, setShowToolT2] = useState(false)
  return (
    <Row className='revenue-section mb-3'>
      <Col className='order-box'>
        <div className='order-box-text'>
          <span className='span-medium'>Doanh thu trong tháng</span>
          <i
            className='fa-solid fa-circle-info ms-2'
            ref={toolt1Ref}
            onClick={() => setShowToolT1(!showToolT1)}
          ></i>
          <Overlay
            target={toolt1Ref.current}
            show={showToolT1}
            placement='right'
          >
            {(props) => (
              <Tooltip id='tooltip1' {...props}>
                Tổng số lượng doanh thu thu được trong một tháng
              </Tooltip>
            )}
          </Overlay>
          <p className='paragraph'>100.000.000VND</p>
        </div>
        <div className='order-box-icon'>
          <i className='fa-solid fa-hand-holding-dollar'></i>
        </div>
      </Col>
      <Col className='order-box'>
        <div className='order-box-text'>
          <span className='span-medium'>Số lượng order trong tháng</span>
          <i
            className='fa-solid fa-circle-info ms-2'
            ref={toolt2Ref}
            onClick={() => setShowToolT2(!showToolT2)}
          ></i>
          <Overlay
            target={toolt2Ref.current}
            show={showToolT2}
            placement='right'
          >
            {(props) => (
              <Tooltip id='tooltip1' {...props}>
                Tổng số lượng order trong một tháng tính trên mỗi lần khách
                thanh toán thành công, chú ý: số lượng này không đại biểu cho
                tổng số lượng khách hàng trong một tháng
              </Tooltip>
            )}
          </Overlay>
          <p className='paragraph'>100</p>
        </div>
        <div className='order-box-icon'>
          <i className='fa-solid fa-bell-concierge'></i>
        </div>
      </Col>
    </Row>
  )
}

export default DashResMonthly
