import React, { useEffect } from 'react'
import { Tab, Tabs } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listRestaurants } from '../../actions/restaurantActions'
import Order from '../../components/OrderComp/Order'

const OrderPage = () => {
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
    <div className='restaurant-section mt-4'>
        <Tabs id='uncontrolled-tab-example' className='mb-3'>
          {restaurants.map((res) => (
            <Tab eventKey={res.name} title={res.name}>
              <Order restaurantId={res._id} />
            </Tab>
          ))}
        </Tabs>
      </div>
  )
}

export default OrderPage