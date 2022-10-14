import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
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
  createCategory,
  deleteCategory,  
  updateCategory,
} from '../../actions/categoryActions'
import { deleteProduct, listProducts, productCreate, updateProduct } from '../../actions/productActions'

const MenuDetail = (resId) => {  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const cats = useSelector((state)=>state.categoryList)
  const {loading:loadingCat, error:errorCat, categories} = cats


  const [addCatModal, setAddCatModal] = useState(false)
  const [addCatName, setaddCatName] = useState()  

  const [selectCatId, setSelectCatId] = useState()
  const [editCatModal, setEditCatModal] = useState(false)
  const [editCatName, setEditCatName] = useState()
  const [editCatId, setEditCatId] = useState()

   
  const [addProName, setAddProName] = useState()
  const [addProDes, setAddProDes] = useState()
  const [addProPrice, setAddProPrice] = useState()
  const [addProImage, setAddProImage] = useState('/upload/jgk.jpg')
  const [addProFeatured, setAddProFeatured] = useState(false)

  const [editPro, setEditPro] = useState()
  const [editProModal, setEditProModal] = useState(false)
  const [editProName, setEditProName] = useState()
  const [editProDes, setEditProDes] = useState()
  const [editProPrice, setEditProPrice] = useState()
  const [editProImage, setEditProImage] = useState('/upload/jgk.jpg')
  const [editProFeatured, setEditProFeatured] = useState(false)
  console.log(editPro)
  
  const product = useSelector((state) => state.productList)
  const { loading, error, products } = product

  const [addProModal, setAddProModal] = useState(false)

  const [category, setCategory] = useState(categories) 
  const dragEnd = (result) => {
    const categoryItems = [...category]
    const [orderedCategory] = categoryItems.splice(result.source.index, 1)
    categoryItems.splice(result.destination.index, 0, orderedCategory)
    setCategory(categoryItems)
    const items = categoryItems.map((item, index) => ({
      ...item,
      index: `${index}`,
    }))
    items.map((item) => dispatch(updateCategory(item)))
  }
 
  // UPLOADING IMAGE PRODUCT
  const [uploading, setUploading] = useState(false)
  const uploadFileHandler = async (e) => {
    const file = e.target.files[0]
    const formData = new FormData()
    formData.append('image', file)
    setUploading(true)

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }

      const { data } = await axios.post('/api/upload', formData, config)

      setAddProImage(data)
      setUploading(false)
    } catch (error) {
      console.error(error)
      setUploading(false)
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

      setEditProImage(data)
      setEditUploading(false)
    } catch (error) {
      console.error(error)
      setEditUploading(false)
    }
  }
  useEffect(() => {      

    setCategory(categories)    
    
  }, [dispatch, navigate, userInfo])

  return (
    <Container fluid>
      <Row style={{ margin: '0', maxWidth: '100%' }}>
        <Col
          className='menu-detail-categories-list me-4'
          lg={3}
          md={3}
          sm={3}
          xl={3}
          xs={3}
          xxl={3}
        >
          <Row>
            <Stack direction='horizontal' gap={2}>
              <span className='span-large'>
                <strong>Danh Mục Món Ăn</strong>
              </span>
              <button
                className='light-btn ms-auto'
                onClick={() => {
                  setAddCatModal(true)
                }}
              >
                <i className='fa-solid fa-plus'></i> Thêm
              </button>
            </Stack>
          </Row>
          <DragDropContext onDragEnd={dragEnd}>
            <Droppable
              droppableId='dropSequence'
              direction='vertical'
              type='column'
            >
              {(provided) => (
                <Row
                  className='u-margin-bottom-small'
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {category.map((cat, index) => (
                    <Draggable
                      draggableId={`draggable-${index}`}
                      key={`draggable-${index}`}
                      index={index}
                    >
                      {(provided) => (
                        <Stack
                          direction='horizontal'
                          className='menu-list-stack my-3'
                          gap={2}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          ref={provided.innerRef}
                        >
                          <i className='fa-solid fa-up-down-left-right'></i>
                          <button
                            className='menu-list-stack-text'
                            onClick={() => {
                              dispatch(listProducts(cat._id))
                              setSelectCatId(cat._id)
                            }}
                          >
                            {cat.name}
                          </button>
                          <i className='fa-solid fa-pencil' onClick={()=>{
                          setEditCatId(cat._id)} }></i>
                          <i className='fa-solid fa-trash-can' onClick={()=>{dispatch(deleteCategory(cat._id))}}></i>
                        </Stack>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </Row>
              )}
            </Droppable>
          </DragDropContext>
          {category.length > 0 && (
            <span style={{ fontSize: 'small' }}>
              <strong>Lưu ý: </strong>
              <span>
                {' '}
                Nhấn kéo thả hình mũi tên trên danh mục để sắp xếp lại thứ tự
                danh mục, thứ tự này sẽ xuất hiện trên Menu dành cho khách hàng
              </span>
            </span>
          )}
        </Col>
        <Col
          className='menu-detail-food'
          lg={8}
          md={8}
          sm={8}
          xl={8}
          xs={8}
          xxl={8}
          style={{ backgroundColor: '#fff' }}
        >
          <Row
            className='u-margin-bottom-small'
            style={{ textAlign: 'center' }}
          >
            <Stack direction='horizontal' gap={2}>
              <span className='span-large'>
                <strong>Danh sách Món Ăn</strong>
              </span>
              <button className='light-btn ms-auto my-1' disabled={!selectCatId} onClick={()=>{setAddProModal(true)}}>
                <i className='fa-solid fa-plus'></i> Thêm Món Ăn
              </button>
            </Stack>
          </Row>
          {products.map((pro) => (
            <>
              {category.length > 0 && (
                <>
                  <Row className='menu-detail-food-row'>
                    <Col className=' col-1' style={{paddingRight:"0"}}>
                      <img
                        src={pro.image}
                        alt={pro.name}
                        className='menu-detail-food-row-img img-fluid'
                      ></img>
                    </Col>
                    <Col className='col-3' style={{paddingRight:"0"}}>
                      <span className='menu-detail-food-row-name'>
                        {pro.name}
                      </span>
                    </Col>
                    <Col className='' style={{paddingRight:"0"}}>
                      <span className='menu-detail-food-row-des'>
                        {pro.description}
                      </span>
                    </Col>
                    <Col className='col-1' style={{paddingRight:"0", textAlign:"center"}}>
                      <span className='menu-detail-food-row-price'>
                        {pro.price}
                      </span>
                    </Col>
                    <Col className='col-1' style={{padding:"0", textAlign:"center"}}>
                      <span className='menu-detail-food-row-featured'>
                        {pro.isFeatured ? <>HOT</> : null}
                      </span>
                    </Col>
                    <Col className='col-1'style={{fontSize:"large", overflow:'hidden', paddingRight:'0'}}>
                    <i className='fa-solid fa-pencil me-2' onClick={()=>{setEditPro(pro) 
                    setEditProModal(true)

                    }} style={{fontSize:"large", cursor:"pointer"}}></i>
                    <i className='fa-solid fa-trash-can' onClick={()=>{dispatch(deleteProduct(pro._id, selectCatId))}} style={{fontSize:"large", cursor:"pointer"}}></i>
                    </Col>
                  </Row>
                  <hr></hr>
                </>
              )}
            </>
          ))}
        </Col>
      </Row>

      <Modal
        show={addCatModal}
        onHide={() => {
          setAddCatModal(!addCatModal)
        }}
      >
        <ModalHeader>
          <ModalTitle>Thêm Danh Mục</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Row className='u-margin-bottom-small'>
            <Col xs={5} style={{ marginRight: '0' }}>
              <p>Tên danh mục:</p>
            </Col>
            <Col>
              <Form.Control
                type='name'
                onChange={(e) => {
                  setaddCatName(e.target.value)
                }}
              ></Form.Control>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            type='submit'
            style={{ backgroundColor: '#E80F88', border: 'none' }}
            className='mx-3'
            variant='primary'
            onClick={() => {
              dispatch(
                createCategory(
                  addCatName,
                  resId.resId,
                  category.length,
                  userInfo._id
                )
              )              
              setAddCatModal(false)
            }
            }
          >
            Thêm
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              setAddCatModal(false)
            }}
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>
            {/* EDIT MODAL */}

            <Modal
        show={editCatModal}
        onHide={() => {
          setEditCatModal(!editCatModal)
        }}
      >
        <ModalHeader>
          <ModalTitle>Chỉnh Sửa Danh Mục</ModalTitle>
        </ModalHeader>
        <ModalBody>
          <Row className='u-margin-bottom-small'>
            <Col xs={5} style={{ marginRight: '0' }}>
              <p>Tên danh mục mới:</p>
            </Col>
            <Col>
              <Form.Control
                type='name'
                onChange={(e) => {
                  setEditCatName(e.target.value)
                }}
              ></Form.Control>
            </Col>
          </Row>
        </ModalBody>
        <ModalFooter>
          <Button
            type='submit'
            style={{ backgroundColor: '#E80F88', border: 'none' }}
            className='mx-3'
            variant='primary'
            onClick={() => {
              dispatch(                
                updateCategory(
                  {name: editCatName,
                  _id: editCatId,
                  restaurant: resId.resId}
                )
              )              
              setEditCatModal(false)
            }
            }
          >
            Sửa
          </Button>
          <Button
            variant='secondary'
            onClick={() => {
              setEditCatModal(false)
            }}
          >
            Hủy
          </Button>
        </ModalFooter>
      </Modal>

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

          <Form.Group controlId='password'className='mb-3'>
            <Form.Label>Mô Tả:</Form.Label>
            <Form.Control
              type='name'
              placeholder='Nhập vào mô tả'
              onChange={(e) => {
                setAddProDes(e.target.value)
              }}
            ></Form.Control>
            </Form.Group>

          <Form.Group controlId='image' className='mb-3'>
            <Form.Label>Hình Ảnh :</Form.Label>
            <Form.Control type='file' onChange={uploadFileHandler} />
            {uploading && <Spinner animation='border' />}
          </Form.Group>
          
          <Form.Group controlId='password' className='mb-3'>
            <Form.Label>Giá tiền :</Form.Label>
            <Form.Control
              type='name'
              placeholder='Nhập vào giá tiền'
              onChange={(e) => {
                setAddProPrice(e.target.value.replace(/\D/,''))
              }} 
              style={{maxWidth:'90%', display:'inline-block'}}                           
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
            <Button style={{backgroundColor: "#E80F88", border:"none"}} className='mx-2'
              onClick={() => {
                dispatch(
                  productCreate(                    
                    addProName,
                    selectCatId,
                    resId.resId,
                    userInfo._id,
                    addProImage,
                    addProDes,
                    addProPrice,
                    addProFeatured,               
                    
                  )
                )
                setAddProModal(false)
              }}
            >
              Thêm
            </Button>
            <Button style={{backgroundColor: "#E80F88", border:"none"}} className='mx-2'
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
      {editPro && (<Modal show={editProModal} onHide={() => setEditProModal(!addProModal)}>
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
            <Button style={{backgroundColor: "#E80F88", border:"none"}} className='mx-2'
              onClick={() => {
                dispatch(
                  updateProduct(                    
                    {
                      _id: editPro._id,
                      name:editProName,                    
                    image:editProImage,
                    description:editProDes,
                    price:editProPrice,
                    isFeatured:editProFeatured,}           
                    
                  )
                )
                setEditProModal(false)
              }}
            >
              Sửa
            </Button>
            <Button style={{backgroundColor: "#E80F88", border:"none"}} className='mx-2'
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
