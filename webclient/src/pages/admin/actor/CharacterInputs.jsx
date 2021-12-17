import React, {useState, useEffect} from 'react';
import { Button, Table } from 'react-bootstrap';
import FieldRow from './CharacterFieldRow';

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

  useEffect(() => {
    setCharacters(
      initialList.map(character=> {
        let field = {
          i:index,
          actor:character.actor._id,
          show:character.show._id,
          character:character.character
        };
        setIndex(index+1);
        return field;
      })
    );
    
  }, []); 



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
            <FieldRow key={character.i}
              character={character} 
              deleteHandler={()=>deleteCharacter(character.i)}
              actorFieldName={actorFieldName}
              showFieldName={showFieldName}
              characterFieldName={characterFieldName}
              actorId={actorId}
              
            />
          ))}
        </tbody>
      </Table>
    </> 
  );
}