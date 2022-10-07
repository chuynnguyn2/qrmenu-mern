import React, { useEffect, useState } from 'react'
import { logout } from '../actions/userActions'
import { useDispatch } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import DashBoardPage from '../screens/LoggedScreen/DashBoardPage'

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
    //main: ,
  },
  {
    name: 'Menu',
    exact: true,
    to: '/storemenu',
    iconClassName: 'fa-solid fa-clipboard-list',
   // main: ,
  },
  {
    name: 'Orders',
    exact: true,
    to: '/order',
    iconClassName: 'fa-solid fa-list-check',
   // main: ,
  },
]

const Sidebar = (props) => {
  const dispatch = useDispatch()
  const [inactive, setInactive] = useState(false)  

  useEffect(() => {
    props.onCollapse(inactive)
  }, [inactive, props])

  return (
     <>      
        <div className={`side-menu ${inactive ? 'inactive col-1' : 'col-3'}`}>
          <div className='top-section'>
            <div className='logo'>
              <h3>QRMENU</h3>
            </div>
            <div
              onClick={() => setInactive(!inactive)}
              className='toggle-menu-btn'
            >
              {inactive ? (
                <i className='fa-solid fa-circle-arrow-right'></i>
              ) : (
                <i className='fa-solid fa-circle-arrow-left'></i>
              )}
            </div>
          </div>

          <div className='main-menu'>
            <ul className='main-menu-list'>
              {menuItems.map((menuItem, index) => (
                <li>
                    <NavLink exact={menuItem.exact}
                    to={menuItem.to}
                    className='menu-item'
                    activeClassName='selected'>
                    <div className='manu-icon'>
                        <i className={menuItem.iconClassName}></i>

                    </div>
                    <span>{menuItem.name}</span>
                    </NavLink>
                </li>               
              ))}
            </ul>
          </div>

          <div className='side-menu-footer'>
            <Link
              className='side-menu-btn'
              to='/login'
              onClick={() => {
                dispatch(logout())
              }}
            >
              Đăng xuất
            </Link>
          </div>
        </div>
    </>
  )
}

export default Sidebar
