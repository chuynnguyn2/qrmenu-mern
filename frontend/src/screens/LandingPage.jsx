import React, { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import ScrollUpButton from '../components/ScrollUpButton'

import photo1 from '../images/photo1.png'
import photo2 from '../images/photo2.png'
import photo3 from '../images/photo3.png'

import videomp4 from '../images/video.mp4'
import videowebm from '../images/video.webm'
import person1 from '../images/person1.png'
import person2 from '../images/person2.jpg'

import footerlogo from '../images/footer_logo.png'

const LandingPage = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin
  const navigate = useNavigate()

  useEffect(() => {
    if (userInfo) {
      navigate('/home')
    }
  }, [userInfo, navigate])

  const myRef = useRef(null)
  const handleScrollToPrice = () => {
    window.scrollTo({
      top: myRef.current.offsetTop,
      behavior: 'smooth',
    })
  }
  return (
    <div className='container-fluid'>
      <ScrollUpButton></ScrollUpButton>

      <div className='navigation'>
        <input
          type='checkbox'
          className='navigation_checkbox'
          id='navi-toggle'
        ></input>
        <label htmlFor='navi-toggle' className='navigation_button'>
          <span className='navigation_icon'>&nbsp;</span>
        </label>
        <div className='navigation_background'>&nbsp;</div>
        <nav className='navigation_nav'>
          <ul className='navigation_list'>
            <li className='navigaton_item'>
              <a href='#' className='navigation_link'>
                <span className='navigation_link-number'>01</span>
                About QRMenu
              </a>
            </li>
            <li className='navigaton_item'>
              <a href='#' className='navigation_link'>
                <span className='navigation_link-number'>02</span>
                Your Benefits
              </a>
            </li>
            <li className='navigaton_item'>
              <a href='#' className='navigation_link'>
                <span className='navigation_link-number'>03</span>Popular Tours
              </a>
            </li>
            <li className='navigaton_item'>
              <a href='#' className='navigation_link'>
                <span className='navigation_link-number'>04</span>Stories
              </a>
            </li>
            <li className='navigaton_item'>
              <a href='#' className='navigation_link'>
                <span className='navigation_link-number'>05</span>Book Now
              </a>
            </li>
          </ul>
        </nav>
      </div>

      <header className='landing-header'>
        <div className='landing-header-login-box'>
          <ul>
            <li className='landing-header-login-item'>
              <a href='/register' className='landing-header-login-link'>
                Đăng Ký
              </a>
            </li>
            <li className='landing-header-login-item'>
              <a href='/login' className='landing-header-login-link'>
                Đăng Nhập
              </a>
            </li>
          </ul>
        </div>
        <div className='text-box'>
          <h1 className='heading-primary'>
            <span className='heading-primary-main'>QR Menu</span>
            <span className='heading-primary-sub'>
              Quản lý nhà hàng đơn giản hơn
            </span>
          </h1>

          <button
            onClick={handleScrollToPrice}
            className='landing-page-btn landing-page-btn-white landing-page-btn-animated'
          >
            Báo giá
          </button>
        </div>
      </header>

      <main>
        <section className='section-about'>
          <div className='u-center-text u-margin-bottom-big'>
            <h2 className='heading-secondary'>
              Tại sao nên sử dụng QR Menu thay thế cho Menu truyền thống
            </h2>
          </div>

          <div className='container-fluid'>
            <div className='row mx-3'>
              <div className='col-sm-5'>
                <h3 className='heading-tertiary u-margin-bottom-small'>
                  You're going to fall in love with nature
                </h3>
                <p className='paragraph'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                  cupidatat non proident, sunt in culpa qui officia deserunt
                  mollit anim id est laborum.
                </p>
                <h3 className='heading-tertiary u-margin-bottom-small'>
                  Live adventures Like you never have before
                </h3>
                <p className='paragraph'>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor.aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehenderit in voluptate velit esse cillum
                  dolore eu fugiat nulla.
                </p>
                <a href='#' className='btn-text'>
                  Tìm hiểu thêm &rarr;
                </a>
              </div>
              <div className='col'></div>
              <div className='col-sm-5'>
                <div className='composition'>
                  <img
                    src={photo1}
                    alt='photo1'
                    className='composition_photo composition_photo--p1'
                  ></img>
                  <img
                    src={photo2}
                    alt='photo2'
                    className='composition_photo composition_photo--p2'
                  ></img>
                  <img
                    src={photo3}
                    alt='photo3'
                    className='composition_photo composition_photo--p3'
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='section-features'>
          <div className='container'>
            <div className='row'>
              <div className='col'>
                <div className='feature-box'>
                  <i className='feature-box_icon fa-solid fa-earth-asia'></i>
                  <h3 className='heading-tertiary u-margin-bottom-small'>
                    Explore the world
                  </h3>
                  <p className='feature-box_text'>
                    Lorem ipsum dolor sit amet, aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehende
                  </p>
                </div>
              </div>
              <div className='col'>
                <div className='feature-box'>
                  <i className='feature-box_icon fa-solid fa-heart'></i>
                  <h3 className='heading-tertiary u-margin-bottom-small'>
                    Live a healthier life
                  </h3>
                  <p className='feature-box_text'>
                    Lorem ipsum dolor sit amet, aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehende
                  </p>
                </div>
              </div>
              <div className='col'>
                <div className='feature-box'>
                  <i className='feature-box_icon fa-solid fa-compass'></i>
                  <h3 className='heading-tertiary u-margin-bottom-small'>
                    Meet nature
                  </h3>
                  <p className='feature-box_text'>
                    Lorem ipsum dolor sit amet, aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehende
                  </p>
                </div>
              </div>
              <div className='col'>
                <div className='feature-box'>
                  <i className='feature-box_icon fa-solid fa-map'></i>
                  <h3 className='heading-tertiary u-margin-bottom-small'>
                    Find your way
                  </h3>
                  <p className='feature-box_text'>
                    Lorem ipsum dolor sit amet, aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehende
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className='section-packages'>
          <div className='u-center-text u-margin-bottom-big'>
            <h2 className='heading-secondary' ref={myRef}>
              Các gói lựa chọn ưu đãi nhất
            </h2>
          </div>
          <div className='hstack gap-3'>
            <div className='col card'>
              <div className='card_side card_side--front'>
                <div className='card_picture card_picture--1'>&nbsp;</div>
                <h4 className='card_heading'>
                  <span className='card_heading-span card_heading-span--1'>
                    The sea Explorer
                  </span>
                </h4>
                <div className='card_details'>
                  <ul>
                    <li>3 day tours</li>
                    <li>Up to 30 people</li>
                    <li>2 tour guides</li>
                    <li>Sleep in cozy hotel</li>
                    <li>Difficulty: ease</li>
                  </ul>
                </div>
              </div>
              <div className='card_side card_side--back card_side--back-1'>
                <div className='card_cta'>
                  <div className='card_price-box'>
                    <p className='card_price-only'>only</p>
                    <p className='card_price-value'>$279</p>
                  </div>
                  <a
                    href='#'
                    className='landing-page-btn landing-page-btn-white'
                  >
                    Book now!
                  </a>
                </div>
              </div>
            </div>
            <div className='col card'>
              <div className='card_side card_side--front'>
                <div className='card_picture card_picture--2'>&nbsp;</div>
                <h4 className='card_heading'>
                  <span className='card_heading-span card_heading-span--2'>
                    The forest Hiker
                  </span>
                </h4>
                <div className='card_details'>
                  <ul>
                    <li>7 day tours</li>
                    <li>Up to 40 people</li>
                    <li>6 tour guides</li>
                    <li>Sleep in provided tents</li>
                    <li>Difficulty: medium</li>
                  </ul>
                </div>
              </div>
              <div className='card_side card_side--back card_side--back-2'>
                <div className='card_cta'>
                  <div className='card_price-box'>
                    <p className='card_price-only'>only</p>
                    <p className='card_price-value'>$379</p>
                  </div>
                  <a
                    href='#'
                    className='landing-page-btn landing-page-btn-white'
                  >
                    Book now!
                  </a>
                </div>
              </div>
            </div>
            <div className='col card'>
              <div className='card_side card_side--front'>
                <div className='card_picture card_picture--3'>&nbsp;</div>
                <h4 className='card_heading'>
                  <span className='card_heading-span card_heading-span--3'>
                    the snow adventurer
                  </span>
                </h4>
                <div className='card_details'>
                  <ul>
                    <li>5 day tours</li>
                    <li>Up to 15 people</li>
                    <li>3 tour guides</li>
                    <li>Sleep in provided tents</li>
                    <li>Difficulty: difficult</li>
                  </ul>
                </div>
              </div>
              <div className='card_side card_side--back card_side--back-3'>
                <div className='card_cta'>
                  <div className='card_price-box'>
                    <p className='card_price-only'>only</p>
                    <p className='card_price-value'>$579</p>
                  </div>
                  <a
                    href='#'
                    className='landing-page-btn landing-page-btn-white'
                  >
                    Book now!
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className='u-center-text u-margin-top-big'>
            <a href='#' className='landing-page-btn landing-page-btn-green'>
              Discorver all tours
            </a>
          </div>
        </section>
        <section className='section-stories'>
          <div className='bg-video'>
            <video className='bg-video_content' autoPlay muted loop>
              <source src={videomp4} type='video/mp4'></source>
              <source src={videowebm} type='video/webm'></source>
              Your brower is not supported
            </video>
          </div>
          <div className='u-center-text u-margin-bottom-big'>
            <h2 className='heading-secondary'>Những câu chuyện được kể </h2>
          </div>
          <div className='row my-3'>
            <div className='story'>
              <figure className='story_shape'>
                <img
                  src={person1}
                  alt='person on a story'
                  className='story_img'
                ></img>
                <figcaption className='story_caption'>Mary Smith</figcaption>
              </figure>
              <div className='story_text'>
                <h3 className='heading-tertiary u-margin-bottom-small'>
                  I had the best week ever with my family
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehende. Lorem ipsum dolor sit
                  amet, aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehende, aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehende
                </p>
              </div>
            </div>
          </div>
          <div className='row my-3'>
            <div className='story'>
              <figure className='story_shape'>
                <img
                  src={person2}
                  alt='person on a story'
                  className='story_img'
                ></img>
                <figcaption className='story_caption'>John Cap</figcaption>
              </figure>
              <div className='story_text'>
                <h3 className='heading-tertiary u-margin-bottom-small'>
                  WOW! my life is completely different now
                </h3>
                <p>
                  Lorem ipsum dolor sit amet, aliquip ex ea commodo consequat.
                  Duis aute irure dolor in reprehende. Lorem ipsum dolor sit
                  amet, aliquip ex ea commodo consequat. Duis aute irure dolor
                  in reprehende, aliquip ex ea commodo consequat. Duis aute
                  irure dolor in reprehende
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className='section-book'>
          <div className='row'>
            <div className='book'>
              <div className='book_form'>
                <div className='u-margin-bottom-medium'>
                  <h2 className='heading-secondary'>Đăng ký ngay!</h2>
                </div>

                <form action='#' className='form'>
                  <div className='form_group'>
                    <input
                      type='email'
                      className='form_input'
                      placeholder='Email'
                      id='email'
                      required
                    ></input>
                    <label htmlFor='email' className='form_label'>
                      Email
                    </label>
                  </div>

                  <div className='form_group'>
                    <input
                      type='tel'
                      className='form_input'
                      placeholder='Số điện thoại'
                      id='phone'
                      required
                    ></input>
                    <label htmlFor='phone' className='form_label'>
                      Số điện thoại
                    </label>
                  </div>

                  <div className='form_group u-margin-bottom-medium'>
                    <div className='form_radio-group'>
                      <input
                        type='radio'
                        className='form_radio-input'
                        id='small'
                        name='size'
                      ></input>
                      <label htmlFor='small' className='form_radio-label'>
                        <span className='form_radio-button'></span>
                        Small tour group
                      </label>
                    </div>

                    <div className='form_radio-group'>
                      <input
                        type='radio'
                        className='form_radio-input'
                        id='large'
                        name='size'
                      ></input>
                      <label htmlFor='large' className='form_radio-label'>
                        <span className='form_radio-button'></span>
                        Large tour group
                      </label>
                    </div>
                  </div>

                  <div className='form_group'>
                    <button className='landing-page-btn landing-page-btn-green'>
                      Bước tiếp theo &rarr;
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className='footer'>
        <div className='footer_logo-box'>
          <img src={footerlogo} alt='footer_logo' className='footer_logo'></img>
        </div>
        <div className='row'>
          <div className='col'>
            <div className='footer_navigation'>
              <ul className='footer_list'>
                <li className='footer_item'>
                  <a href='#' className='footer_link'>
                    Company
                  </a>
                </li>
                <li className='footer_item'>
                  <a href='#' className='footer_link'>
                    About Us
                  </a>
                </li>
                <li className='footer_item'>
                  <a href='#' className='footer_link'>
                    Contact Us
                  </a>
                </li>
                <li className='footer_item'>
                  <a href='#' className='footer_link'>
                    Privacy
                  </a>
                </li>
                <li className='footer_item'>
                  <a href='#' className='footer_link'>
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className='col'>
            <ul className='footer_contact'>
              <li className='footer_contact-detail'>
                Địa chỉ: Lô N-1 Khu công nghiệp Quế Võ (Khu mở rộng), Phường Nam
                Sơn, Thành phố Bắc Ninh, Tỉnh Bắc Ninh, Việt Nam{' '}
              </li>
              <li className='footer_contact-detail'>Mã Bưu Điện: 16100</li>
              <li className='footer_contact-detail'>
                Điện thoại: (84) 222-625118
              </li>
              <li className='footer_contact-detail'>
                Email: Goertekvn@goertek.com
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default LandingPage
