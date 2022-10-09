import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listCategories } from '../../actions/categoryActions'

const MenuDetail = ({ restaurantId }) => {
  const navigate = useNavigate()

  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const listCategory = useSelector((state)=>state.categoryList)
  const {loading, error, categories} = listCategory

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    } else {
      dispatch(listCategories(restaurantId))
    }
  }, [dispatch, navigate, restaurantId, userInfo])


  return (         
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
              {categories.map((cat)=>(
                <span>{cat.name}</span>
              ))}
            </Row>            
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
  )
}
export default MenuDetail
