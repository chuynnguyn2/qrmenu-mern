import React, { useState } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import MenuDetail from '../../components/MenuComp/MenuDetail'

const MenuPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const items = JSON.parse(localStorage.getItem('restaurantList'))
  const [selectRes, setSelectRes] = useState(items[0])

  return (
    <div className='menu-screen'>
      <h3>Quản lý Menu của bạn</h3>
      <div className='restaurant-section mt-4'>
        <Tabs id='uncontrolled-tab-example' className='mb-3'>
          {items.map((res) => (
            <Tab eventKey={res.name} title={res.name}>
              <MenuDetail restaurant={res} />
            </Tab>
          ))}
        </Tabs>
      </div>
    </div>
  )
}

export default MenuPage
