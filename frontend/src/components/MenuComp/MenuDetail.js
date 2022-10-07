import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { listCategories } from '../../actions/categoryActions'

const MenuDetail = ({ restaurant }) => {
  //const Grid = WidthProvider(GridLayout)
  const layouts = [
    { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    { i: 'b', x: 1, y: 0, w: 3, h: 1 },
    { i: 'c', x: 4, y: 0, w: 1, h: 2 },
  ]
  return (
    <div className='menu-detail'>
      <div>
        Menu của nhà hàng <strong>{restaurant.name}</strong>
      </div>
      <Container fluid>
        <Row style={{ margin: '0', maxWidth: '100%' }}>
          <Col
            className='menu-detail-categories-list me-4'
            lg={4}
            md={4}
            sm={4}
            xl={4}
            xs={4}
            xxl={4}
          >
            <Row className='u-margin-bottom-small'>
              <span className='span-large'>
                <strong>Danh Mục Món Ăn</strong>
              </span>
            </Row>
            {/* <GridLayout className='layout' layout={layouts}>
              <div key='1'>{restaurant.name} 1</div>
              <div key='2'>{restaurant.name} 2</div>
              <div key='3'>{restaurant.name} 3</div>
            </GridLayout> */}
          </Col>
          <Col
            className='menu-detail-food'
            lg={7}
            md={7}
            sm={7}
            xl={7}
            xs={7}
            xxl={7}
            style={{ backgroundColor: '#fff' }}
          >
            <Row
              className='u-margin-bottom-small'
              style={{ textAlign: 'center' }}
            >
              <span className='span-large'>
                <strong>Thông Tin Món Ăn</strong>
              </span>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default MenuDetail
