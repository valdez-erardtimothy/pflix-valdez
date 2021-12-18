import React, {useState} from 'react';
import {ListGroup, Form, Button} from 'react-bootstrap';
import { useSelector } from 'react-redux';
export default function ProducerShowRowInput({showRow, deleteHandler, producerId}){
  
  const {
    titles=[]
  } = useSelector(state=>state.admin.shows);
  const [show, setShow] = useState(showRow?.show || titles[0]._id || "");
  return<ListGroup.Item>
    <Form.Select name="shows[]" value={show} onChange={(e)=>setShow(e.target.value)}>
      {titles.map(title=><option key={title._id}value={title._id}>{title.title}</option>)}
    </Form.Select>
    <Form.Control type="hidden" name="producers[]" value={producerId}/>
    <Button 
      className="material-icons"
      variant="danger" 
      size="sm" onClick={deleteHandler}>
        delete
    </Button>
  </ListGroup.Item>; 
}