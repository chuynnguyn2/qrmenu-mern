import axios from 'axios'
import React, { useEffect, useState } from 'react'
import {
  Button,
  Col,
  Container,
  Form,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  ModalTitle,
  Row,
  Spinner,
  Stack,
} from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {
  deleteProduct,
  productCreate,
  updateProduct,
} from '../../actions/productActions'
import {
  ref,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from 'firebase/storage'
import { storage } from '../../config/db'

const MenuDetail = ({ selectCatId }) => {
  const [selectCat, setSelectCat] = useState(selectCatId)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userUID = userInfo.user.uid

  const [addProName, setAddProName] = useState()
  const [addProDes, setAddProDes] = useState()
  const [addProMaterial, setAddProMaterial] = useState()
  const [addProPrice, setAddProPrice] = useState()
  const [addProFeatured, setAddProFeatured] = useState(false)

  const [editPro, setEditPro] = useState()
  const [editProModal, setEditProModal] = useState(false)
  const [editProName, setEditProName] = useState()
  const [editProDes, setEditProDes] = useState()
  const [editProPrice, setEditProPrice] = useState()
  const [editProFeatured, setEditProFeatured] = useState(false)
  const [imgUrl, setImgUrl] = useState('')
  console.log(imgUrl)

  const product = useSelector((state) => state.productList)
  const { loading, error, products } = product

  const [addProModal, setAddProModal] = useState(false)

  // UPLOADING IMAGE PRODUCT
  const uniqueId = Date.now().toString()

  const [file, setFile] = useState('')
  const handleChange = (e) => {
    setFile(e.target.files[0])
  }
  const handleUpload = () => {
    if (file) {
      const metadata = {
        contentType: 'image/jpeg',
      }
      const imageRef = ref(storage, `users/${userUID}/${selectCat}/${uniqueId}`)
      const uploadTask = uploadBytesResumable(imageRef, file, metadata)

      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        console.log('File available at', downloadURL)
        setImgUrl(downloadURL)
      })
    }
  }

  // EDIT IMAGE PRODUCT
  const [editUploading, setEditUploading] = useState(false)
  const editFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setEditUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setEditUploading(false)
    } catch (error) {
      console.error(error)
      setEditUploading(false)
    }
  }
  useEffect(() => {
    setSelectCat(selectCatId)
  }, [dispatch, navigate, selectCatId, userInfo, selectCat])

  return (
    <Container>
      <Row className='u-margin-bottom-small' style={{ textAlign: 'center' }}>
        <Stack direction='horizontal' gap={2}>
          <span className='span-large'>
            <strong>Danh sách Món Ăn</strong>
          </span>
          <button
            className='light-btn ms-auto my-1'
            disabled={selectCatId === ''}
            onClick={() => {
              setAddProModal(true)
            }}
          >
            <i className='fa-solid fa-plus'></i> Thêm Món Ăn
          </button>
        </Stack>
      </Row>
      {selectCat === '' ? (
        <>Chọn danh mục bên phải để xem danh sách món ăn</>
      ) : (
        <>
          {products.map((pro) => (
            <>
              {pro.cat === selectCat ? (
                <>
                  <Row className='menu-detail-food-row'>
                    <Col className=' col-2' style={{ paddingRight: '0' }}>
                      <img
                        src={pro.imgUrl}
                        alt={pro.name}
                        className='menu-detail-food-row-img img-fluid'
                      ></img>
                    </Col>
                    <Col className='col-2' style={{ paddingRight: '0' }}>
                      <span className='menu-detail-food-row-name'>
                        {pro.name}
                      </span>
                    </Col>
                    <Col
                      className='col-2'
                      style={{
                        paddingRight: '0',
                        fontSize: 'xx-small',
                      }}
                    >
                      <span className='menu-detail-food-row-des'>
                        {pro.material}
                      </span>
                    </Col>
                    <Col
                      className=''
                      style={{
                        paddingRight: '0',
                        fontSize: 'xx-small',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      <span className='menu-detail-food-row-des'>
                        {pro.description}
                      </span>
                    </Col>
                    <Col
                      className='col-2'
                      style={{ paddingRight: '0', textAlign: 'center' }}
                    >
                      <span className='menu-detail-food-row-price'>
                        {pro.price},000vnđ
                      </span>
                    </Col>
                    <Col
                      className='col-1'
                      style={{ padding: '0', textAlign: 'center' }}
                    >
                      <span className='menu-detail-food-row-featured'>
                        {pro.isHot ? <>HOT</> : null}
                      </span>
                    </Col>
                    <Col
                      className='col-1'
                      style={{
                        fontSize: 'large',
                        overflow: 'hidden',
                        paddingRight: '0',
                      }}
                    >
                      <i
                        className='fa-solid fa-pencil me-2'
                        onClick={() => {
                          setEditPro(pro)
                          setEditProModal(true)
                        }}
                        style={{ fontSize: 'large', cursor: 'default' }}
                      ></i>
                      <i
                        className='fa-solid fa-trash-can'
                        onClick={() => {
                          dispatch(deleteProduct({ id: pro.id, user: userUID }))
                        }}
                        style={{ fontSize: 'large', cursor: 'default' }}
                      ></i>
                    </Col>
                  </Row>
                  <hr></hr>
                </>
              ) : (
                <></>
              )}
            </>
          ))}
        </>
      )}

      {/* CREATE PRODUCT MODAL */}
      <Modal show={addProModal} onHide={() => setAddProModal(!addProModal)}>
        <ModalHeader>
          <ModalTitle>Thêm Món Ăn Mới</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Form.Group controlId='password' className='mb-3'>
            <Form.Label>Tên Món Ăn:</Form.Label>
            <Form.Control
              type='name'
              placeholder='Nhập vào tên món ăn'
              onChange={(e) => {
                setAddProName(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='password' className='mb-3'>
            <Form.Label>Mô Tả:</Form.Label>
            <Form.Control
              type='name'
              placeholder='Nhập vào mô tả'
              onChange={(e) => {
                setAddProDes(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>
          <Form.Group controlId='password' className='mb-3'>
            <Form.Label>Nguyên Liệu:</Form.Label>
            <Form.Control
              type='name'
              placeholder='Nhập vào nguyên liệu'
              onChange={(e) => {
                setAddProMaterial(e.target.value)
              }}
            ></Form.Control>
          </Form.Group>

          <Form.Group controlId='image' className='mb-3'>
            <Form.Label>Hình Ảnh :</Form.Label>
            <Form.Control
              type='file'
              accept='image/*'
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId='password' className='mb-3'>
            <Form.Label>Giá tiền :</Form.Label>
            <Form.Control
              type='name'
              placeholder='Nhập vào giá tiền'
              onChange={(e) => {
                setAddProPrice(e.target.value.replace(/\D/, ''))
              }}
              style={{ maxWidth: '90%', display: 'inline-block' }}
            ></Form.Control>
            <span className='px-3'>đ</span>
          </Form.Group>
          <Form.Group controlId='password' className='mb-3'>
            <Form.Label>Có phải món phổ biến không:</Form.Label>
            <Form.Select
              value={addProFeatured}
              onChange={(e) => {
                setAddProFeatured(e.target.value)
              }}
            >
              <option value={false}>Không</option>
              <option value={true}>Có</option>
            </Form.Select>
          </Form.Group>
        </ModalBody>
        <ModalFooter>
          <Col className='d-flex justify-content-center align-items-center'>
            <Button
              style={{ backgroundColor: '#E80F88', border: 'none' }}
              className='mx-2'
              onClick={() => {
                handleUpload()
                dispatch(
                  productCreate({
                    user: userUID,
                    cat: selectCat,
                    id: uniqueId,
                    name: addProName,
                    description: addProDes,
                    imgUrl: imgUrl,
                    isHot: addProFeatured,
                    material: addProMaterial,
                    price: addProPrice,
                  })
                )
                setAddProModal(false)
              }}
            >
              Thêm
            </Button>
            <Button
              style={{ backgroundColor: '#E80F88', border: 'none' }}
              className='mx-2'
              onClick={() => {
                setAddProModal(false)
              }}
            >
              Hủy
            </Button>
          </Col>
        </ModalFooter>
      </Modal>

      {/* EDIT PRODUCT MODAL */}
      {editPro && (
        <Modal show={editProModal} onHide={() => setEditProModal(!addProModal)}>
          <ModalHeader>
            <ModalTitle>Chỉnh Sửa Món Ăn</ModalTitle>
          </ModalHeader>
          <ModalBody>
            <Form.Group controlId='password'>
              <Form.Label>Tên Món Ăn:</Form.Label>
              <Form.Control
                type='name'
                placeholder={editPro.name}
                onChange={(e) => {
                  setEditProName(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Mô Tả:</Form.Label>
              <Form.Control
                type='name'
                placeholder={editPro.des}
                onChange={(e) => {
                  setEditProDes(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId='image' className='mb-3'>
              <Form.Label>Hình Ảnh :</Form.Label>
              <Form.Control type='file' onChange={editFileHandler} />
              {editUploading && <Spinner animation='border' />}
            </Form.Group>

            <Form.Group controlId='password'>
              <Form.Label>Giá tiền :</Form.Label>
              <Form.Control
                type='name'
                placeholder={editPro.price}
                onChange={(e) => {
                  setEditProPrice(e.target.value)
                }}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='password'>
              <Form.Label>Có phải món phổ biến không:</Form.Label>
              <Form.Select
                value={editProFeatured}
                onChange={(e) => {
                  setEditProFeatured(e.target.value)
                }}
              >
                <option value={false}>Không</option>
                <option value={true}>Có</option>
              </Form.Select>
            </Form.Group>
          </ModalBody>
          <ModalFooter>
            <Col className='d-flex justify-content-center align-items-center'>
              <Button
                style={{ backgroundColor: '#E80F88', border: 'none' }}
                className='mx-2'
                onClick={() => {
                  dispatch(
                    updateProduct({
                      _id: editPro._id,
                      name: editProName,
                      description: editProDes,
                      price: editProPrice,
                      isFeatured: editProFeatured,
                    })
                  )
                  setEditProModal(false)
                }}
              >
                Sửa
              </Button>
              <Button
                style={{ backgroundColor: '#E80F88', border: 'none' }}
                className='mx-2'
                onClick={() => {
                  setEditProModal(false)
                }}
              >
                Hủy
              </Button>
            </Col>
          </ModalFooter>
        </Modal>
      )}
    </Container>
  )
}

export default MenuDetail
