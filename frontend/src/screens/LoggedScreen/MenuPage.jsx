import React from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import MenuDetail from '../../components/MenuComp/MenuDetail'

const MenuPage = () => {
  const items = JSON.parse(localStorage.getItem('restaurantList'))

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
