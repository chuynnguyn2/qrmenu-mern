import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { login } from '../actions/userActions'
import { listRestaurants } from '../actions/restaurantActions'

const LoginPage = () => {
  const [loginId, setloginId] = useState('')
  const [password, setPassword] = useState('')

  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, success, userInfo } = userLogin

  const location = useLocation()
  const navigate = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'

  useEffect(() => {
    if (success) {
      dispatch(listRestaurants(userInfo._id))
      navigate('/home')
    }
  }, [dispatch, navigate, success, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    dispatch(login(loginId, password))
  }

  return (
    <div
      className='login container-fluid'
      style={{
        display: 'flex',
        justifyContent: 'left',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <a href='/' className='home-link'>
        QRMenu
      </a>

      <div className='login_box col-6'>
        <div className='u-center-text u-margin-bottom-big'>
          <h2 className='heading-secondary'>Đăng Nhập</h2>
        </div>
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <div className='spinner-border' />}

        <form>
          <div className='login_group'>
            <label className='login_label'>Số điện thoại</label>
            <input
              className='login_input'
              type='tel'
              placeholder='Nhập vào Số điện thoại'
              value={loginId}
              onChange={(e) => setloginId(e.target.value)}
            ></input>
          </div>

          <div className='login_group'>
            <label className='login_label'>Mật Khẩu</label>
            <input
              className='login_input'
              type='password'
              placeholder='Nhập vào mật khẩu'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </div>
          <div className='login_forgot-password'>
            <Link className='login_forgot-password-link' to={'/forgotpassword'}>
              Quên mật khẩu?
            </Link>
          </div>

          <div className='u-margin-bottom-small'>
            <button onClick={submitHandler} className='btn-login-green'>
              Đăng Nhập
            </button>
          </div>
        </form>

        <div className='register-box'>
          <p className='paragraph-white'>
            Bạn chưa có tài khoản?{' '}
            <Link
              className='paragraph-grey'
              to={redirect ? `/register?redirect=${redirect}` : '/register'}
            >
              Đăng Ký Ngay!
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
