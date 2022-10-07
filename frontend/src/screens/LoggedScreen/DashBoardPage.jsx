import React, { useEffect } from 'react'
import { Button, Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listRestaurants } from '../actions/restaurantActions'
import DashRes from '../components/DashRes'

const DashBoardPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const restaurantList = useSelector((state) => state.restaurantList)
  const { loading, error, restaurants } = restaurantList

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    } else {
      dispatch(listRestaurants(userInfo._id))
    }
  }, [])

  return (
    <>
      <div className='dashboard-hi'>
        <h3>Xin Chào {userInfo.phone},</h3>
        <div className='dashboard-hi-profile'>
          <button className='dark-btn'>Chỉnh sửa thông tin cá nhân</button>
        </div>
      </div>
      <div className='restaurant-section mt-4'>
        <Tabs id='uncontrolled-tab-example' className='mb-3'>
          {restaurants.map((res) => (
            <Tab eventKey={res.name} title={res.name}>
              <DashRes restaurant={res} />
            </Tab>
          ))}
        </Tabs>
      </div>
    </>
  )
}

export default DashBoardPage
