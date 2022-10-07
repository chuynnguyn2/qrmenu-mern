import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
} from 'react-bootstrap'
import QRCode from 'react-qr-code'
import { useDispatch, useSelector } from 'react-redux'
import { updateRestaurant } from '../../actions/restaurantActions'

const ResDetailTable = ({ restaurant }) => {
  const dispatch = useDispatch()
  const [tableNo, setTableNo] = useState(restaurant.tableNo)
  const [size, setSize] = useState(256)
  const [back, setBack] = useState('#FFFFFF')
  const [fore, setFore] = useState('#000000')
  const [showModel, setShowModel] = useState(false)
  const [wifi, setWifi] = useState(restaurant.wifi)
  const [password, setPassword] = useState(restaurant.password)
  const updatedRestaurant = useSelector((state) => state.editRestaurant)
  const { loading, success, erroe, updateRes } = updatedRestaurant

  let tableLinks = []
  for (let i = 1; i <= tableNo; i++) {
    tableLinks.push(`http://localhost:3000/menu/${restaurant._id}?table=${i}`)
  }

  useEffect(() => {
    if (success) {
      setShowModel(false)
    }
  }, [success])

  return (
    <div className='restaurant-detail-table'>
      <Modal
        show={showModel}
        onHide={() => setShowModel(false)}
        dialogClassName='my-modal'
      >
        <ModalHeader closeButton>
          <ModalTitle>Chỉnh sửa mã QR</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Container>
            <Row>
              <Col>
                <Form.Group className='mb-3' controlId='setwifi'>
                  <Form.Label>Tên Wifi</Form.Label>
                  <Form.Control
                    type='name'
                    onChange={(e) => {
                      setWifi(e.target.value)
                    }}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='setpassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='name'
                    onChange={(e) => {
                      setPassword(e.target.value)
                    }}
                  />
                </Form.Group>
              </Col>
              <Col
                style={{
                  backgroundColor: '#D6EFED',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                <Card
                  className='my-3 p-3 rounded'
                  style={{
                    width: '367px',
                    height: 'auto',
                    display: 'inline-block',
                    color: 'black',
                  }}
                >
                  <Card.Title as='div'>Bàn 0/Table 0</Card.Title>
                  <Card.Body>
                    <QRCode
                      title='QRMenu'
                      value='Mã QR dùng thử'
                      bgColor={back}
                      fgColor={fore}
                      size={size === '' ? 0 : size}
                    />
                    <p className='paragraph my-1'>
                      Nhà Hàng: <strong>{restaurant.name}</strong>
                    </p>
                    {wifi && <p className='paragraph my-1'>Wifi: {wifi}</p>}
                    {password && (
                      <p className='paragraph my-1'>Pasword: {password}</p>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Container>
        </ModalBody>
        <ModalFooter>
          <Button
            type='submit'
            style={{ backgroundColor: '#E80F88', border: 'none' }}
            className='mx-3'
            variant='primary'
            onClick={() => {
              dispatch(
                updateRestaurant({
                  _id: restaurant._id,
                  wifi: wifi,
                  password: password,
                  phone: restaurant.phone,
                })
              )
            }}
          >
            Lưu
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

      <div className='restaurant-detail-table-number-input mb-3'>
        <Form.Label htmlFor='inputTableNo'>Số bàn ăn của quán:</Form.Label>{' '}
        <Form.Control
          id='inputTableNo'
          placeholder='0'
          style={{ display: 'inline-block', width: '10%' }}
          value={tableNo}
          onChange={(event) => {
            setTableNo(event.target.value.replace(/\D/, ''))
            dispatch(
              updateRestaurant({
                _id: restaurant._id,
                phone: restaurant.phone,
                tableNo: event.target.value.replace(/\D/, ''),
              })
            )
          }}
        ></Form.Control>
        <button
          className='light-btn mx-3 py-1'
          onClick={() => {
            setShowModel(true)
          }}
        >
          Thêm Wifi vào mã QR <i className='fa-solid fa-qrcode' />
        </button>
      </div>
      {tableLinks.map((tablelink, index) => (
        <Card
          className='my-3 p-3 rounded'
          style={{
            width: '50%',
            height: '80%',
            display: 'inline-block',
            color: 'black',
          }}
        >
          <Card.Title as='div'>
            Bàn {index + 1}/Table {index + 1}
          </Card.Title>
          <Card.Body>
            <QRCode
              title='QRMenu'
              value={tablelink}
              bgColor={back}
              fgColor={fore}
              size={size === '' ? 0 : size}
            />
            <p className='paragraph my-1'>
              Nhà Hàng: <strong>{restaurant.name}</strong>
            </p>
            {wifi && (
              <p className='paragraph my-1'>
                Wifi: <strong>{wifi}</strong>
              </p>
            )}
            {password && (
              <p className='paragraph my-1'>
                Pasword: <strong>{password}</strong>
              </p>
            )}
          </Card.Body>
        </Card>
      ))}
    </div>
  )
}

export default ResDetailTable
