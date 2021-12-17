import React, {useState, useEffect} from 'react';
import {Row, Col, Figure} from 'react-bootstrap';
/**
 * @param {FileList} fileList the content of the files field.
 */
export default function ImgFieldGallery({fileList}) {

  const [URIs, setURIs ] = useState([]);

  useEffect(()=>{
    let uris = Array.from(fileList).map(file=>{
      return {
        uri: URL.createObjectURL(file),
        name: file.name};
    });
    setURIs(uris);
    console.debug('useEffect URIs', URIs);
    return ()=> {
      URIs.map(uri=>URL.revokeObjectURL(uri.uri));  
      console.debug('uris after cleanup:', URIs);
    };
  }, [fileList]);

  return (
    URIs.length>0 &&(
      <Row >
        {URIs.map(uri=>(
          <Col 
            xs="12" 
            sm="6" 
            lg="3"
            key={uri.name}
            className="border px-2 my-1"
          >
            <Figure>
              <Figure.Image src={uri.uri} fluid max-height="600px" />
              <Figure.Caption>{uri.name}</Figure.Caption>
            </Figure>
          </Col>)
        )}
      </Row>
    )
  );
}