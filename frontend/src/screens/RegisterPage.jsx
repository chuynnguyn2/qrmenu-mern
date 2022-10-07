import React, { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import { register } from '../actions/userActions'

const RegisterPage = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isActive, setIsActive] = useState(false)
  const [type, setType] = useState('small')
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userRegister = useSelector((state) => state.userRegister)
  const { loading, error, userInfo } = userRegister

  const location = useLocation()
  const navigate = useNavigate()
  const redirect = location.search ? location.search.split('=')[1] : '/'
  useEffect(() => {
    if (userInfo) {
      navigate('/restaurant')
    }
  }, [navigate, userInfo])

  const submitHandler = (e) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      setMessage('Mật khẩu không trùng khớp')
    } else {
      dispatch(register(name, email, password, phone, isActive, type))
    }
  }

  return (
    <div
      className='login register'
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
      <div className='login_box'>
        <div className='u-center-text u-margin-bottom-big'>
          <h2 className='heading-secondary'>Đăng Ký</h2>
        </div>
        {message && <Message variant='danger'>{message}</Message>}
        {error && <Message variant='danger'>{error}</Message>}
        {loading && <div className='spinner-border' type='status' />}

        <div>
          <div className='login_group'>
            <label className='login_label'>Tên</label>
            <input
              className='login_input'
              type='name'
              placeholder='Nhập vào Tên của bạn'
              value={name}
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>

          <form className='login_group'>
            <label className='login_label'>Số điện thoại</label>
            <input
              className='login_input'
              type='name'
              placeholder='Nhập vào Số điện thoại của bạn'
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            ></input>
          </form>

          <form className='login_group'>
            <label className='login_label'>Email</label>
            <input
              className='login_input'
              type='email'
              placeholder='Nhập vào Email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </form>

          <form className='login_group'>
            <label className='login_label'>Mật Khẩu</label>
            <input
              className='login_input'
              type='password'
              placeholder='Nhập vào mật khẩu'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            ></input>
          </form>

          <form className='login_group'>
            <label className='login_label'>Xác Nhận Mật Khẩu</label>
            <input
              className='login_input'
              type='password'
              placeholder='Xác nhận lại mật khẩu'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            ></input>
          </form>

          <div className='u-margin-bottom-small'>
            <button onClick={submitHandler} className='btn-login-green'>
              Đăng Ký
            </button>
          </div>
        </div>

        <div className='register-box'>
          <p className='paragraph-white'>
            Bạn đã có tài khoản?{' '}
            <Link
              className='paragraph-grey'
              to={redirect ? `/login?redirect=${redirect}` : '/login'}
            >
              Đăng Nhập Ngay!
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
