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
  Stack,
} from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import {
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../actions/categoryActions'

import { listProducts } from '../../actions/productActions'
import { listRestaurants } from '../../actions/restaurantActions'
import MenuDetail from '../../components/MenuComp/MenuDetail'

const MenuPage = () => {
  const res = useSelector((state) => state.restaurantList)
  const { loading, success, restaurants } = res
  const cats = useSelector((state) => state.categoryList)
  const { loading: loadingCat, error: errorCat, categories } = cats
  let category = categories

  const [addCatModal, setAddCatModal] = useState(false)
  const [addCatName, setaddCatName] = useState()

  const [selectCatId, setSelectCatId] = useState('')
  const [editCatModal, setEditCatModal] = useState(false)
  const [editCatName, setEditCatName] = useState()
  const [editCatId, setEditCatId] = useState()

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const userUID = userInfo.user.uid

  const createCat = useSelector((state) => state.createCategory)
  const {
    loading: loadingCreateCat,
    success: successCreateCat,
    createCategory: createCate,
  } = createCat
  const editCats = useSelector((state) => state.editCategory)
  const {
    loading: loadingEditCat,
    success: successEditCat,
    updateCat,
  } = editCats
  const deleteCats = useSelector((state) => state.deleteCategory)
  const { loading: loadingDeleteCat, success: successDeleteCat } = deleteCats

  const createPro = useSelector((state) => state.createProduct)
  const {
    loading: loadingCreatePro,
    success: successCreatePro,
    createPRODUCT: createProduct,
  } = createPro
  const editPro = useSelector((state) => state.editProduct)
  const {
    loading: loadingEditPro,
    success: successEditPro,
    updateProduct,
  } = editPro
  const deletePro = useSelector((state) => state.deleteProduct)
  const {
    loading: loadingDeletePro,
    success: successDeletePro,
    catId,
  } = deletePro

  const dragEnd = (result) => {
    const categoryItems = [...category]
    const sourceCat = categoryItems[result.source.index]
    const desCat = categoryItems[result.destination.index]
    const sourceCount = sourceCat.count
    const desCount = desCat.count
    dispatch(
      updateCategory({ id: sourceCat.id, count: desCount, user: userUID })
    )
    dispatch(
      updateCategory({ id: desCat.id, count: sourceCount, user: userUID })
    )
    const [orderedCategory] = categoryItems.splice(result.source.index, 1)
    categoryItems.splice(result.destination.index, 0, orderedCategory)
    category = categoryItems
  }

  useEffect(() => {
    if (userInfo === null) {
      navigate('/login')
    } else {
      dispatch(listRestaurants(userUID))
      dispatch(listCategories(userUID))
      dispatch(listProducts(userUID))
    }
    if (successCreateCat || successEditCat || successDeleteCat) {
      dispatch(listCategories(userUID))
    }
    if (successCreatePro) {
      dispatch(listProducts(userUID))
    }
    if (successEditPro) {
      dispatch(listProducts(userUID))
    }
    if (successDeletePro) {
      dispatch(listProducts(userUID))
    }
  }, [
    dispatch,
    navigate,
    successCreateCat,
    successEditCat,
    successDeleteCat,
    userInfo,
    successCreatePro,
    successEditPro,
    successDeletePro,
    userUID,
  ])

  return (
    <div className='menu-screen'>
      <h3>Quản lý Menu của bạn</h3>
      <div className='restaurant-section mt-4 u-margin-bottom-small'>
        {restaurants.map((res) => {
          return <div>Bạn đang xem Menu của nhà hàng {res.name}</div>
        })}
      </div>
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
                                setSelectCatId(cat.id)
                              }}
                            >
                              {cat.name}
                            </button>
                            <i
                              className='fa-solid fa-pencil'
                              onClick={() => {
                                setEditCatId(cat.id)
                                setEditCatModal(!editCatModal)
                              }}
                            ></i>
                            <i
                              className='fa-solid fa-trash-can'
                              onClick={() => {
                                dispatch(
                                  deleteCategory({ id: cat.id, user: userUID })
                                )
                              }}
                            ></i>
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
                  danh mục, thứ tự này sẽ xuất hiện trên Menu dành cho khách
                  hàng
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
            <MenuDetail selectCatId={selectCatId}></MenuDetail>
          </Col>
        </Row>
      </Container>
      {/* ADD CAT MODAL */}
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
              dispatch(createCategory(addCatName, userUID))
              setAddCatModal(false)
            }}
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
      {/* EDIT CAT MODAL */}

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
                updateCategory({
                  name: editCatName,
                  id: editCatId,
                  user: userUID,
                })
              )
              setEditCatModal(false)
            }}
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
    </div>
  )
}

export default MenuPage
