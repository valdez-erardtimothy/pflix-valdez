import React from 'react';
export default function Review({review}) {
  return <div className="p-2">
    <h6 className="mb-1">{review.user.name} </h6>
    <p>Rating: {review.rating}
      <span className="material-icons">grade</span>&nbsp;
      <span className="text-muted">&#x2f;5</span>
    </p>
    <p>{review.comment}</p>
  </div>;
}