/* pkg import */
import React, {useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useAlert } from 'react-alert';
import {Button, Form, FloatingLabel} from 'react-bootstrap';
/* component import */
import ShowJumbotron from '../components/user_side/ShowJumbotron';
import Review from '../components/user_side/Review';
/* action import */
import {clearDeleteReviewStatus, load, review, deleteReview, clearReviewStatus} from '../features/showSlice';
import { startLoad,endLoad } from '../features/loadingSlice';

export default function ShowDetails() {
  /* hooks */
  const dispatch = useDispatch();
  const alert = useAlert();
  const navigate = useNavigate();

  /* react-router vars */
  let { showId } = useParams();

  /* redux states */
  const {
    loaded: show,
    loadStatus,
    deleteReviewStatus,
    reviewStatus
  } = useSelector(state=>state.show); 
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

  // review submit status side effects
  useEffect(()=> {
    const isLoaded = reviewStatus !== "loading";
    if(isLoaded) {
      dispatch(clearReviewStatus());
      dispatch(endLoad());
    } else {dispatch(startLoad());}
    if(reviewStatus === "failed") {
      alert.error('Error in submitting review');
      navigate('/');
    }
  }, [reviewStatus]);
  
  // review delete status side effects
  useEffect(()=> {
    const isLoaded = deleteReviewStatus !== "loading";
    if(isLoaded) {
      dispatch(clearDeleteReviewStatus());
      dispatch(endLoad());
    } else {dispatch(startLoad());}
    if(deleteReviewStatus === "failed") {
      alert.error('Error in deleteting review data');
      navigate('/');
    }
  }, [deleteReviewStatus]);


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
        <h4 className='mt-5 mb-2'>Reviews</h4>
        {/* start of user review */}
        {authenticated ? <> 
          <div className="border p-2 ms-2">
            {show.reviewOfAuthenticated?<>
              <h5>Reviewed  &nbsp;
                <Button 
                  as="span" 
                  className="material-icons"
                  variant="danger"
                  onClick={()=>dispatch(deleteReview({showId: show._id}))}
                >
                    delete
                </Button>
              </h5>
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
        {/* end of user review */}
        {show.reviews && show.reviews.map(review=>(
          <div key={review.user._id} className="mb-2">
            <Review review={review}/>
          </div>
        ))}
      </>
    )}
  </>;
}