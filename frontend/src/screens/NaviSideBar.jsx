import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import Sidebar from '../components/Sidebar'
import { menuItems } from '../components/Sidebar'

const NaviSideBar = () => {
  
  const [inactive, setInactive] = useState(false)

  const userLogin = useSelector((state)=>state.userLogin)
  const {userInfo} = userLogin

  return (
    <>{userInfo && (
      <div style={{ background: '#f7f7f7'}} className='container-fluid'>
      
          <Sidebar
            onCollapse={(inactive) => {
              setInactive(inactive)
            }}
          />
          <div className={`page-container ${inactive ? 'inactive col-11' : 'col-8'}`}>
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
    </>
  )
}

export default NaviSideBar
