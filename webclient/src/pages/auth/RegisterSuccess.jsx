import React from 'react';
import {Link} from 'react-router-dom';
export default function RegisterSuccess() {
  return <>
    <h1>Registration successful!</h1>
    <p>Please <Link to="/login">Log in</Link> with your new account.</p>
  </>;
}