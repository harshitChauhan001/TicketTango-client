import React from 'react'
import { Link } from 'react-router-dom'

function BadRequest() {
  return (
      <div>
          <h1>400 - Bad Request</h1>
          <p>The request is invalid. Please check the URL.</p>
          <Link to="/">Go to Home page</Link>

    </div>
  )
}

export default BadRequest