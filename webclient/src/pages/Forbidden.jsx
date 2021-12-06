import React from 'react';
import {Link} from 'react-router-dom';
export default function Forbidden() {
  return <>
    <h1>Forbidden!</h1>
    <p>You&apos;re going places you shouldn&apos;t be.</p>
    <Link to="/">Go where you can</Link>
  </>;
}