import React from 'react'
import Loader from '$components/Loader'

import './globalLoader.scss'

export default function GlobalLoader () {
  return (
    <div className="global-loader">
      <Loader />
    </div>
  )
}
