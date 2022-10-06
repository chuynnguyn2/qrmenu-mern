import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const LandingPage = () => {
    const userLogin = useSelector((state)=>state.userLogin)
    const {loading, error, userInfo} = userLogin
    const navigate = useNavigate()

    useEffect(()=>{
        if (userInfo){
            navigate('/home')
        }
    },[userInfo,navigate])
  return (
    <div className='container-fluid'>
        <header className='landing-header' >
        </header>
    </div>
  )
}

export default LandingPage