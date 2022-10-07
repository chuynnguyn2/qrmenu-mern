import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import {
  updateRestaurant,
  deleteRestaurant,
} from '../../actions/restaurantActions'
import TextareaAutosize from 'react-textarea-autosize'

const ResDetailInfo = ({ restaurant }) => {
  const dispatch = useDispatch()
  const [editable, setEditable] = useState(false)
  const [showModal, setShowModal] = useState(false)

  const [editName, setEditName] = useState(restaurant.name)
  const [editAddress, setEditAddress] = useState(restaurant.address)
  const [editPhone, setEditPhone] = useState(restaurant.phone)

  const deleteRes = useSelector((state) => state.deleteRestaurant)
  const { loading, success, error } = deleteRes

  useEffect(() => {
    if (success) {
      setShowModal(false)
    }
  })

  return (
    <div className='restaurant-detail-info'>
      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <ModalHeader closeButton>
          <ModalTitle style={{ color: 'red' }}>
            Xác Nhận Xóa Nhà Hàng
          </ModalTitle>
        </ModalHeader>
        <ModalBody>
          <p>
            Bạn chắc chắn muốn xóa nhà hàng <strong>{restaurant.name}</strong>?
          </p>
        </ModalBody>
        <ModalFooter>
          <Button
            type='submit'
            style={{ backgroundColor: 'red', border: 'none' }}
            className='mx-3'
            variant='primary'
            onClick={() => {
              dispatch(deleteRestaurant(restaurant._id))
            }}
          >
            Xóa
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              setShowModal(false)
            }}
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
      <div>
        <Row style={{ fontSize: '1.4rem' }} className='my-3'>
          <Col md='auto' style={{ margin: '0', padding: '0' }}>
            <Form.Label
              htmlFor='res-name'
              style={{ margin: '0', padding: '0' }}
            >
              Tên nhà hàng:{' '}
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              id='res-name'
              disabled={!editable}
              defaultValue={restaurant.name}
              onChange={(e) => {
                setEditName(e.target.value)
              }}
              style={{
                color: !editable ? 'inherit' : 'black',
                fontSize: 'inherit',
                backgroundColor: 'white',
                border: 'none',
                padding: '0',
                display: 'inline-block',
                width: 'auto',
              }}
            ></Form.Control>
          </Col>
        </Row>
      </div>
      <div>
        <Row style={{ fontSize: '1.4rem' }} className='my-3'>
          <Col md='auto' style={{ margin: '0', padding: '0' }}>
            <Form.Label
              htmlFor='res-address'
              style={{ margin: '0', padding: '0' }}
            >
              Địa chỉ:{' '}
            </Form.Label>
          </Col>
          <Col>
            <TextareaAutosize
              minRows={1}
              id='res-address'
              disabled={!editable}
              as='textarea'
              defaultValue={restaurant.address}
              onChange={(e) => {
                setEditAddress(e.target.value)
              }}
              style={{
                width: '100%',
                color: !editable ? 'inherit' : 'black',
                fontSize: 'inherit',
                height: 'auto',
                backgroundColor: 'white',
                border: 'none',
                padding: '0',
                display: 'inline-block',
              }}
            ></TextareaAutosize>
          </Col>
        </Row>
      </div>
      <div>
        <Row style={{ fontSize: '1.4rem' }} className='my-3'>
          <Col md='auto' style={{ margin: '0', padding: '0' }}>
            <Form.Label
              htmlFor='res-phone'
              style={{ margin: '0', padding: '0' }}
            >
              Số điện thoại:{' '}
            </Form.Label>
          </Col>
          <Col>
            <Form.Control
              id='res-phone'
              disabled={!editable}
              defaultValue={restaurant.phone}
              onChange={(e) => {
                setEditPhone(e.target.value)
              }}
              style={{
                color: !editable ? 'inherit' : 'black',
                fontSize: 'inherit',
                backgroundColor: 'white',
                border: 'none',
                padding: '0',
                display: 'inline-block',
                width: 'auto',
              }}
            ></Form.Control>
          </Col>
        </Row>
      </div>
      <div className='d-flex justify-content-end my-2'>
        {editable ? (
          <button
            onClick={() => {
              setEditable(!editable)
              dispatch(
                updateRestaurant({
                  _id: restaurant._id,
                  name: editName,
                  address: editAddress,
                  phone: editPhone,
                })
              )
            }}
            className='light-btn py-1'
          >
            Lưu
          </button>
        ) : (
          <>
            <button
              className='light-btn py-1 mx-2'
              onClick={() => {
                setEditable(!editable)
              }}
            >
              Chỉnh sửa thông tin
            </button>
            <button
              className='light-btn py-1 mx-2'
              onClick={() => {
                setShowModal(true)
              }}
            >
              Xóa Cửa Hàng
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ResDetailInfo
