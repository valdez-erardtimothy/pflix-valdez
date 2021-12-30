/* pkg import */
import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {Button, Form, FloatingLabel} from 'react-bootstrap';
/* component import */
import ShowJumbotron from '../components/user_side/ShowJumbotron';
/* action import */
import {load} from '../features/showSlice';
import { startLoad,endLoad } from '../features/loadingSlice';
import { review } from '../features/showSlice';

export default function ShowDetails() {
  /* hooks */
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  /* react-router vars */
  let { showId } = useParams();

  /* redux states */
  const {loaded: show, loadStatus} = useSelector(state=>state.show); 
  const {authenticated} = useSelector(state=>state.auth);

  /* effects  */
  
  // fetch showId on page visit
  useEffect(()=>{
    dispatch(load(showId));
  }, []);
  
  // fetch status side effects
  useEffect(()=> {
    const isLoaded = loadStatus !== "loading";
    if(isLoaded) {
      dispatch(endLoad());
    } else {dispatch(startLoad());}
    if(loadStatus === "failed") {
      alert.error('Error in fetching show data');
      navigate('/');
    }
  }, [loadStatus]);


  /* handlers */
  const reviewSubmitHandler = async(e) => {
    e.preventDefault();
    dispatch(review({
      showId: show._id,
      formData: new FormData(e.target)
    }));
  };

  /* render */
  return <>
    {show && (
      <>
        <ShowJumbotron show={show}/>
        <h4>Reviews</h4>
        {authenticated ? <> 
          <div className="border p-2">
            {show.reviewOfAuthenticated?<>
              <h5>Reviewed</h5>
              <p>Your rating: {show.reviewOfAuthenticated.rating}
                <span className="material-icons">
                  grade
                </span> of 5
              </p>
              <p>Comment: {show.reviewOfAuthenticated?.comment || "n/a"}</p>
            </>:(
              <>
                <h5>Review now!</h5>
                <Form onSubmit={reviewSubmitHandler}>
                  <FloatingLabel 
                    controlId="reviewRating"
                    label="Rating"
                    className="d-inline-block"
                  >
                    <Form.Select name="rating"
                    >
                      {[...Array(5).keys()].map(val=>{
                        val=val+1;
                        return <option key={val} value={val}>{val.toString()}</option>;
                      })}
                    </Form.Select>
                  </FloatingLabel>
                  <FloatingLabel
                    controlId="reviewComment"
                    label="Comment"
                    className="mb-2 "
                  >
                    <Form.Control 
                      as="textarea"
                      style={{height:"100px"}}
                      name="comment"
                      placeholder="foo"
                    />
                  </FloatingLabel>
                  <Button type="submit" variant="primary">Review</Button>
                </Form>
              </>
            )}
            
          </div>
        </> : <>
          <p className="text-muted">Please sign in to drop a review.</p> 
        </>
        }
      </>
    )}
  </>;
}