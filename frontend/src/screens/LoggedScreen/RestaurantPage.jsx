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

  const [selectRes, setSelectRes] = useState()

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
  const userId = userInfo._id

  const createdRestaurant = useSelector((state) => state.createRestaurant)
  const {
    loading: loadingCreate,
    error: errorCreate,
    success: successCreate,
    createRestaurant: createRestaurants,
  } = createdRestaurant

  const [showModel, setShowModel] = useState(false)
  const [name, setName] = useState('')
  const [address, setAddress] = useState('')
  const [phone, setPhone] = useState('')

  const [disable, setDisable] = useState(false)

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    } else {
      dispatch(listRestaurants(userInfo._id))
    }

    if (successCreate || successDelete) {
      dispatch(listRestaurants(userInfo._id))
      setShowModel(false)
    }

    if (userInfo.type === 'small') {
      if (restaurants.length > 0) {
        setDisable(true)
      }
    }
    if (userInfo.type === 'medium') {
      if (restaurants.length > 2) {
        setDisable(true)
      }
    }
    if (userInfo.type === 'large') {
      if (restaurants.length > 4) {
        setDisable(true)
      }
    }
  }, [dispatch, navigate, successCreate, successDelete, userInfo, selectRes])

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
                  dispatch(restaurantCreate(name, userId, address, phone))
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
                className='restaurant-list me-4'
                lg={4}
                md={4}
                sm={4}
                xl={4}
                xs={4}
                xxl={4}
              >
                <Row className='u-margin-bottom-small'>
                  <span className='span-large'>
                    <strong>Các nhà hàng của bạn</strong>
                  </span>
                </Row>
                <Row className='u-margin-bottom-small'>
                  {restaurants.map((res) => (
                    <Stack
                      direction='horizontal'
                      className='restaurant-list-stack my-3'
                    >
                      <button
                        className='span-medium restaurant-list-stack-text'
                        onClick={() => {
                          setSelectRes(res)
                        }}
                      >
                        {res.name}
                      </button>
                    </Stack>
                  ))}
                </Row>
                <Row>
                  <button
                    className='light-btn py-2'
                    onClick={() => {
                      setShowModel(true)
                    }}
                    disabled={disable}
                  >
                    Thêm Nhà Hàng
                  </button>
                </Row>
              </Col>
              <Col
                className='restaurant-detail'
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
                    <strong>Thông tin nhà hàng</strong>
                  </span>
                </Row>
                {selectRes && (
                  <RestaurantDetail restaurant={selectRes}></RestaurantDetail>
                )}
              </Col>
            </Row>
          </Container>
        </>
      )}
    </div>
  )
}

export default RestaurantPage
