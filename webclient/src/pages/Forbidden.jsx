import React from 'react';
import { Helmet } from 'react-helmet-async';
import {Link} from 'react-router-dom';
export default function Forbidden() {
  return <>
    <Helmet>
      <title>Go Back! | PFlix</title>
    </Helmet>
    <h1>Forbidden!</h1>
    <p>You&apos;re going places you shouldn&apos;t be.</p>
    <Link to="/">Go where you can</Link>
  </>;
}