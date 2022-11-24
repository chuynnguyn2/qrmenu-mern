import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
  Spinner,
  Stack,
} from 'react-bootstrap'
import {
  listRestaurants,
  restaurantCreate,
} from '../../actions/restaurantActions'
import Message from '../../components/Message'
import { useNavigate } from 'react-router-dom'
import RestaurantDetail from '../../components/RestaurantComp/RestaurantDetail'

const RestaurantPage = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const restaurantList = useSelector((state) => state.restaurantList)
  const { loading, error, restaurants } = restaurantList

  const deleteRestaurant = useSelector((state) => state.deleteRestaurant)
  const {
    loading: loadingDelete,
    error: errorDelete,
    success: successDelete,
  } = deleteRestaurant

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userId = userInfo.user.uid
  const userUID = userInfo.user.uid

  const createdRestaurant = useSelector((state) => state.createRestaurant)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
  } = createdRestaurant

  const [showModel, setShowModel] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    } else {
      dispatch(listRestaurants(userUID))
    }

    if (successCreate || successDelete) {
      dispatch(listRestaurants(userUID))
      setShowModel(false)
    }
  }, [dispatch, navigate, successCreate, successDelete, userInfo, userUID])

  return (
    <div className='restaurant mx-6rem'>
      {loading ? (
        <Spinner animation='border' />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Modal show={showModel} onHide={() => setShowModel(false)}>
            <ModalHeader>
              <ModalTitle>Thêm Nhà Hàng</ModalTitle>
            </ModalHeader>
            <ModalBody>
              <Row className='u-margin-bottom-small'>
                <Col xs={5} style={{ marginRight: '0' }}>
                  <p>Tên nhà hàng:</p>
                </Col>
                <Col>
                  <Form.Control
                    type='name'
                    onChange={(e) => {
                      setName(e.target.value)
                    }}
                  ></Form.Control>
                </Col>
              </Row>
              <Row className='u-margin-bottom-small'>
                <Col xs={5} style={{ marginRight: '0' }}>
                  <p>Địa chỉ:</p>
                </Col>
                <Col>
                  <Form.Control
                    as='textarea'
                    type='name'
                    onChange={(e) => {
                      setAddress(e.target.value)
                    }}
                  ></Form.Control>
                </Col>
              </Row>
              <Row className='u-margin-bottom-small'>
                <Col xs={5} style={{ marginRight: '0' }}>
                  <p>Số Điện Thoại:</p>
                </Col>
                <Col>
                  <Form.Control
                    type='tel'
                    onChange={(e) => {
                      setPhone(e.target.value)
                    }}
                  ></Form.Control>
                </Col>
              </Row>
            </ModalBody>
            <ModalFooter>
              <Button
                type='submit'
                style={{ backgroundColor: '#E80F88', border: 'none' }}
                className='mx-3'
                variant='primary'
                onClick={() => {
                  dispatch(restaurantCreate(name, userUID, address, phone))
                }}
              >
                Thêm
              </Button>
              <Button
                variant='secondary'
                onClick={() => {
                  setShowModel(false)
                }}
              >
                Hủy
              </Button>
            </ModalFooter>
          </Modal>

          <Container fluid>
            <Row style={{ margin: '0', maxWidth: '100%' }}>
              <Col
                className='restaurant-detail'
                lg={10}
                md={10}
                sm={10}
                xl={10}
                xs={10}
                xxl={10}
                style={{ backgroundColor: '#fff' }}
              >
                <Row
                  className='u-margin-bottom-small'
                  style={{ textAlign: 'center' }}
                >
                  <span className='span-large'>
                    <strong>Thông tin nhà hàng</strong>
                  </span>
                </Row>
                <RestaurantDetail></RestaurantDetail>
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  )
}

export default RestaurantPage
