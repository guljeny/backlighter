import React from 'react'
import classnames from 'classnames'

export default function withPopupAnimation (Component) {
  return class PopupWithAnimation extends React.Component {
    state = {
      isHidden: true,
    }

    overlayRef = React.createRef()

    componentDidMount () {
      setTimeout(() => {
        this.setState({ isHidden: false })
      }, 0)
    }

    closePopup = () => {
      this.setState({ isHidden: true })
      this.overlayRef.current.addEventListener('transitionend', this.props.closePopup)
    }

    render () {
      const { isHidden } = this.state
      return (
        <div
          ref={this.overlayRef}
          className={classnames('overlay', isHidden && 'overlay--hidden')}
        >
          <div className={classnames('popup', isHidden && 'popup--hidden')}>
            <Component {...this.props} closePopup={this.closePopup} />
          </div>
        </div>
      )
    }
  }
}
