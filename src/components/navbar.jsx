import React from 'react'
import { Link } from 'gatsby'

const Navbar = ({ siteTitle }) => (
  <h1>
    <Link to="/">
      {siteTitle}
    </Link>
  </h1>
)

export default Navbar
