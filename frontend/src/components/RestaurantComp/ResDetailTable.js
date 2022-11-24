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
  const [table, setTable] = useState(restaurant.table)
  const [size, setSize] = useState(256)
  const [back, setBack] = useState('#FFFFFF')
  const [fore, setFore] = useState('#000000')
  const [showModel, setShowModel] = useState(false)
  const [wifi, setWifi] = useState(restaurant.wifi)
  const [password, setPassword] = useState(restaurant.wifiPassword)
  const updatedRestaurant = useSelector((state) => state.editRestaurant)
  const { loading, success, error } = updatedRestaurant

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userUID = userInfo.user.uid

  let tableLinks = []
  for (let i = 1; i <= table; i++) {
    tableLinks.push(`http://localhost:3000/menu/${userUID}?table=${i}`)
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
                    value={wifi}
                    onChange={(e) => {
                      setWifi(e.target.value)
                    }}
                  />
                </Form.Group>
                <Form.Group className='mb-3' controlId='setpassword'>
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type='name'
                    value={password}
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
                  id: restaurant.id,
                  wifi: wifi,
                  wifiPassword: password,
                  user: userUID,
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
          value={table}
          onChange={(event) => {
            setTable(Number(event.target.value.replace(/\D/, '')))
            dispatch(
              updateRestaurant({
                id: restaurant.id,
                table: Number(event.target.value.replace(/\D/, '')),
                user: userUID,
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
