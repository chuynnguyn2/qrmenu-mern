import React, { useEffect, useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import ResDetailInfo from './ResDetailInfo'
import ResDetailTable from './ResDetailTable'

const RestaurantDetail = () => {
  const [key, setKey] = useState('tables')
  const restaurantList = useSelector((state) => state.restaurantList)
  const { loading, error, restaurants } = restaurantList

  return (
    <div className='restaurant-detail'>
      {restaurants.map((res) => (
        <>
          <h3 className='my-3'>{res.name}</h3>
          <Tabs
            id='restaurant-detail-tabs'
            activeKey={key}
            onSelect={(k) => {
              setKey(k)
            }}
            className='mb-3'
          >
            <Tab eventKey='tables' title='Quản Lý Bàn Ăn'>
              <ResDetailTable restaurant={res} />
            </Tab>
            <Tab eventKey='info' title='Thông tin cửa hàng'>
              <ResDetailInfo restaurant={res} />
            </Tab>
          </Tabs>
        </>
      ))}
    </div>
  )
}

export default RestaurantDetail
