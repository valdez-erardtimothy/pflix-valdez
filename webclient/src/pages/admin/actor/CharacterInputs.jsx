import React, {useState, useEffect} from 'react';
import { Button, Form, Table } from 'react-bootstrap';
import { useSelector } from 'react-redux';


/**
 * 
 * @param {*} initialList required but put blank value to prevent bug 
 * @returns 
 */
export default function  CharacterInputs({
  actorId,
  initialList=[],
  actorFieldName="actors[]",
  showFieldName="shows[]",
  characterFieldName="characters[]"
}) {
  let [characters, setCharacters] = useState([]);
  let [index, setIndex] = useState(0);
  const {
    titles=[]
  } = useSelector(state=>state.admin.shows);

  useEffect(() => {
    setCharacters(
      initialList.map(character=> {
        let field = {
          i:index,
          actor:character.actor._id,
          film:character.film._id,
          character:character.character
        };
        setIndex(index+1);
        return field;
      })
    );
    
  }, []); 

  const fieldRow = (character) => {
    
    return <tr key={character._id}>
      <td>
        <Form.Select name={showFieldName}>
          {titles.map(title=>(
            <option key={title._id} value={title._id}>
              {title.title}
            </option>
          ))}
        </Form.Select>
      </td>
      <td>
        <Form.Control name={characterFieldName}/>
      </td>
      <td>
        <Button 
          className="material-icons" 
          variant="danger"
          onClick={()=>{deleteCharacter(character.i);}}
        >
            delete
        </Button>
      </td>
      <Form.Control 
        type="hidden" 
        name={actorFieldName} 
        value={character?.actor || actorId}
      />
    </tr>;
  };

  const addCharacter = () => {
    let copy = characters.slice();
    copy.push({i:index});
    setCharacters(copy);
    setIndex(index+1);
    return;
  };

  const deleteCharacter = (i) => {
    setCharacters(characters.filter(character=>character.i!=i));
  };

  return (
    <>
      <h4>Filmography
        <Button 
          size="sm"
          className="material-icons"
          onClick={addCharacter}
        >
          add
        </Button>
      </h4>
      <Table bordered>
        <thead>
          <tr>
            <th>Show</th>
            <th>Character</th>
            <th 
              className='text-danger material-icons' 
              title="delete">
            delete
            </th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character)=> (
            fieldRow(character)
          ))}
        </tbody>
      </Table>
    </> 
  );
}