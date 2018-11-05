import React from 'react'
import { Link } from 'gatsby'

const Navbar = (props) => (
  <h1>
    <Link to="/">
      {props.test}
    </Link>
  </h1>
)

export default Navbar
