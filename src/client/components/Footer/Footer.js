import React from 'react'

import './footer.scss'

export default function Footer () {
  return (
    <footer>
      <div className="container">
        2020-{(new Date()).getFullYear()} © Backlighter
      </div>
    </footer>
  )
}
