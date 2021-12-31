import React from 'react';
import { useSelector } from 'react-redux';
export default function Review({review}) {
  const {authenticatedUser} = useSelector(state=>state.auth);
  return <div className="p-2">
    <h6 className="mb-1">
      {review.user.name}&nbsp;
      {authenticatedUser&& authenticatedUser._id === review.user._id && (
        <small className='text-muted'>(You)</small>
      )}
    </h6>
    <p>Rating: {review.rating}
      <span className="material-icons">grade</span>&nbsp;
      <span className="text-muted">&#x2f;5</span>
    </p>
    <p>{review.comment}</p>
  </div>;
}