import React from 'react';
import {Link} from 'react-router-dom';
export default function Footer() {
  return <>
    <div>
      <h6>&copy;2021 For academic purposes</h6>
      <h6><Link to='/admin'>Admin</Link></h6>
    </div>
  </>;
}