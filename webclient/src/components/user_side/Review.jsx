import React from 'react';
export default function Review({review}) {
  return <div className="p-2">
    <h6 className="mb-1">{review.user.name}</h6>
    <p>{review.comment}</p>
  </div>;
}