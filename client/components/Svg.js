import React from 'react'

export default function Svg ({ sprite }) {
  return (
    <span dangerouslySetInnerHTML={{ __html: sprite }} />
  )
}
