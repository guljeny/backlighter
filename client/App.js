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
import AddDevise from './modules/AddDevise'
import DeviseList from './modules/DeviseList'
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
          <div className="content">
            <Switch>
              <Route exact path="/devise/add/:uid" component={AddDevise} />
              <Route exact path="/" component={Shop} />
              <Route exact path="/devises" component={DeviseList} />
            </Switch>
          </div>
          <Footer />
          <Popup />
        </Router>
      </Provider>
    )
  }
}
