import React from 'react'
import { Provider } from 'react-redux'
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { init as initI18n } from '$utils/I18n'
import loadUser from '$utils/loadUser'
import store from '$store'
import Header from './components/Header'
import Footer from './components/Footer'
import Popup from './components/Popup'
import GlobalLoader from './components/GlobalLoader'
import AddDevice from './modules/AddDevice'
import DeviceList from './modules/DeviceList'
import Shop from './modules/Shop'

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
        <Router>
          <Header />
          <div className="content container">
            <Switch>
              <Route exact path="/device/add/:uid" component={AddDevice} />
              <Route exact path="/" component={Shop} />
              <Route exact path="/control-panel" component={DeviceList} />
            </Switch>
          </div>
          <Footer />
          <Popup />
        </Router>
      </Provider>
    )
  }
}
