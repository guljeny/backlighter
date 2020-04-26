import React from 'react'
import { Provider } from 'react-redux'
import { init as initI18n } from '$utils/I18n'
import loadUser from '$utils/loadUser'
import store from '$store'
import Header from './components/Header'
import Popup from './components/Popup'
import GlobalLoader from './components/GlobalLoader'

import './app.scss'

export default class App extends React.Component {
  state = {
    loading: true,
  }

  async componentDidMount () {
    await Promise.all([
      initI18n(),
      loadUser(),
    ])
    this.setState({ loading: false })
  }

  render () {
    const { loading } = this.state
    if (loading) return <GlobalLoader />
    return (
      <Provider store={store}>
        <Header />
        <Popup />
      </Provider>
    )
  }
}
