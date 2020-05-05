import React from 'react'
import { connect } from 'react-redux'
import { closePopup } from '$actions/popups'

export function Popup ({ popup, closePopup }) {
  if (!popup) return null
  const { Component, props, name } = popup
  return <Component closePopup={() => closePopup(name)} {...props} />
}

const mapStateToProps = ({ popups }) => ({
  popup: popups.popupQueue.length ? popups.popupQueue[0] : null,
})

export default connect(mapStateToProps, { closePopup })(Popup)
