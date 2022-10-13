import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink, Route, Routes } from 'react-router-dom'
import {logout} from '../actions/userActions'

import DashBoardPage from './LoggedScreen/DashBoardPage'
import RestaurantPage from './LoggedScreen/RestaurantPage'
import MenuPage from './LoggedScreen/MenuPage'
import OrderPage from './LoggedScreen/OrderPage'

export const menuItems = [
  {
    name: 'Quản Lý',
    exact: true,
    to: '/home',
    iconClassName: 'fa-solid fa-home',
    main: DashBoardPage,
  },
  {
    name: 'Cửa Hàng',
    exact: true,
    to: '/restaurant',
    iconClassName: 'fa-solid fa-store',
    main: RestaurantPage ,
  },
  {
    name: 'Menu',
    exact: true,
    to: '/storemenu',
    iconClassName: 'fa-solid fa-clipboard-list',
   main: MenuPage,
  },
  {
    name: 'Orders',
    exact: true,
    to: '/order',
    iconClassName: 'fa-solid fa-list-check',
    main: OrderPage,
  },
]

const NaviSideBar = () => {  

  const userLogin = useSelector((state)=>state.userLogin)
  const {userInfo} = userLogin
  const dispatch = useDispatch()

  return (
    <div className='container-fluid'>
    {userInfo && (
      <div style={{ background: '#f7f7f7'}} className='row'>
        <div className='side-menu col-3'>                                 

          <div className='main-menu pt-5'>
            <div className='main-menu-list'>
              {menuItems.map((menuItem, index) => (
                
                    <NavLink exact={menuItem.exact}
                    to={menuItem.to}
                    className='menu-item row my-3 py-2'
                    activeClassName='selected'>
                    <div className='menu-icon col-2'>
                        <i className={menuItem.iconClassName}></i>
                    </div>
                    <h3 className='col'>{menuItem.name}</h3>
                    </NavLink>
                              
              ))}
            </div>
          </div>
            <Link
              className='side-menu-btn py-2'
              to='/login'
              onClick={() => {
                dispatch(logout())
              }}
            >
              Đăng xuất
            </Link>

        </div>
      
          <div className='col pt-5' style={{marginLeft:'28%', minHeight:"100vh"}}>
            {menuItems.map((menu, index) => (
              <Routes>
                <Route
                  key={menu.name}
                  exact={menu.exact}
                  path={menu.to}
                  element={<menu.main />}
                />
              </Routes>
            ))}
          </div>
    </div>
    )}
    </div>
  )
}

export default NaviSideBar
