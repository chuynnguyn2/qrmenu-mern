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
  Tab,
  Tabs,
} from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import { updateRestaurant } from '../../actions/restaurantActions'
import ResDetailInfo from './ResDetailInfo'
import ResDetailTable from './ResDetailTable'

const RestaurantDetail = ({ restaurant }) => {
  const [key, setKey] = useState('tables')

  return (
    <div className='restaurant-detail'>
      <h3 className='my-3'>{restaurant.name}</h3>
      <Tabs
        id='restaurant-detail-tabs'
        activeKey={key}
        onSelect={(k) => {
          setKey(k)
        }}
        className='mb-3'
      >
        <Tab eventKey='tables' title='Quản Lý Bàn Ăn'>
          <ResDetailTable restaurant={restaurant} />
        </Tab>
        <Tab eventKey='info' title='Thông tin cửa hàng'>
          <ResDetailInfo restaurant={restaurant} />
        </Tab>
      </Tabs>
    </div>
  )
}

export default RestaurantDetail
