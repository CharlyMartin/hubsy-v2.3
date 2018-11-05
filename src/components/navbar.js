import React from 'react'
import { Link } from 'gatsby'

const Navbar = ({ siteTitle }) => (
  <div
    style={{
      background: 'rebeccapurple',
      marginBottom: '1.45rem',
    }}
  >
    <h1 style={{ margin: 0 }}>
      <Link to="/">
        {siteTitle}
      </Link>
    </h1>

  </div>
)

export default Navbar
