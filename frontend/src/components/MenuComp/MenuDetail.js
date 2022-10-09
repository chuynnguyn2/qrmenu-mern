import React, { useEffect, useState } from 'react'
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { listCategories } from '../../actions/categoryActions'

const MenuDetail = () => {  
  //const categories = JSON.parse(localStorage.getItem('categoryList')) 
  const [category, setCategory] = useState(JSON.parse(localStorage.getItem('categoryList')) )  

  const dragEnd=(result)=>{
      const categoryItems = [...category]
      const [orderedCategory] = categoryItems.slice(result.source.index, 1)
      categoryItems.slice(result.destination.index, 0, orderedCategory)
      setCategory(categoryItems)
      console.log('first')
  }    

  return (         
      <Container fluid>
        <Row style={{ margin: '0', maxWidth: '100%' }}>
          <Col
            className='menu-detail-categories-list me-4'
            lg={4}
            md={4}
            sm={4}
            xl={4}
            xs={4}
            xxl={4}
          >
          <span className='span-large'>
                <strong>Danh Mục Món Ăn</strong>
              </span>
          <DragDropContext onDragEnd={dragEnd}>
          <Droppable 
          droppableId='dropSequence'
          direction='vertical'
          type='column'>
          {(provided)=>(<Row className='u-margin-bottom-small' {...provided.droppableProps} ref={provided.innerRef}>
              
              {category.map((cat,index)=>(
                <Draggable draggableId={`draggable-${index}`} key={`draggable-${index}`} index={index}>
                {(provided)=>(
                  <span {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{cat.name}</span>
                  )}                
                </Draggable>
              ))}
              {provided.placeholder}
            </Row> )}
            
            </Droppable>
            </DragDropContext>           
          </Col>
          <Col
            className='menu-detail-food'
            lg={7}
            md={7}
            sm={7}
            xl={7}
            xs={7}
            xxl={7}
            style={{ backgroundColor: '#fff' }}
          >
            <Row
              className='u-margin-bottom-small'
              style={{ textAlign: 'center' }}
            >
              <span className='span-large'>
                <strong>Thông Tin Món Ăn</strong>
              </span>
            </Row>
          </Col>
        </Row>
      </Container>
  )
}
export default MenuDetail
