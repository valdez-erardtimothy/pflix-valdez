import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import {useSelector} from 'react-redux';

export default function fieldRow ({
  character, 
  deleteHandler,
  actorFieldName="actors[]",
  showFieldName="shows[]",
  characterFieldName="characters[]",
  actorId, 
}) {
  
  const {
    titles=[]
  } = useSelector(state=>state.admin.shows);
  const [show, setShow] = useState(character.show || titles[0]._id || "");
  const [characterName, setCharacterName] = useState(character.character || "" );
  return <tr >
    <td>
      <Form.Select name={showFieldName} 
        value={show} 
        onChange={(e)=>setShow(e.target.value)}
      >
        {titles.map(title=>(
          <option key={title._id} value={title._id}>
            {title.title}
          </option>
        ))}
      </Form.Select>
    </td>
    <td>
      <Form.Control 
        name={characterFieldName}
        value={characterName}
        onChange={(e)=>setCharacterName(e.target.value)}
      />
    </td>
    <td>
      <Button 
        className="material-icons" 
        variant="danger"
        onClick={deleteHandler}
        // onClick={()=>{deleteCharacter(character.i);}}
      >
          delete
      </Button>
      <Form.Control 
        type="hidden" 
        name={actorFieldName} 
        value={character?.actor || actorId}
      />
    </td>
  </tr>;
}