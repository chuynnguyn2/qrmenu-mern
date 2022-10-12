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
  createCategory,
  listCategories,
  updateCategory,
} from '../../actions/categoryActions'
import { listProducts } from '../../actions/productActions'

const MenuDetail = (resId) => {  
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin
  const cats = useSelector((state)=>state.categoryList)
  const {loading:loadingCat, error:errorCat, categories} = cats

  const [addCatModal, setAddCatModal] = useState(false)
  const [addCatName, setaddCatName] = useState()  

  const [category, setCategory] = useState(categories)  
  
  const product = useSelector((state) => state.productList)
  const { loading, error, products } = product

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
                            }}
                          >
                            {cat.name}
                          </button>
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
              <button className='light-btn ms-auto my-1'>
                <i className='fa-solid fa-plus'></i> Thêm Món Ăn
              </button>
            </Stack>
          </Row>
          {products.map((pro) => (
            <>
              {category.length > 0 && (
                <>
                  <Row className='menu-detail-food-row'>
                    <Col className=' col-1'>
                      <img
                        src={pro.image}
                        alt={pro.name}
                        className='menu-detail-food-row-img img-fluid'
                      ></img>
                    </Col>
                    <Col className='col-3'>
                      <span className='menu-detail-food-row-name'>
                        {pro.name}
                      </span>
                    </Col>
                    <Col className=''>
                      <span className='menu-detail-food-row-des'>
                        {pro.description}
                      </span>
                    </Col>
                    <Col className='col-1'>
                      <span className='menu-detail-food-row-price'>
                        {pro.price}
                      </span>
                    </Col>
                    <Col className='col-1'>
                      <span className='menu-detail-food-row-featured'>
                        {pro.isFeatured ? <>HOT</> : null}
                      </span>
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
    </Container>
  )
}

export default MenuDetail
