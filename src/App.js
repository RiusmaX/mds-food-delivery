import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './components/Header'

import Restaurants from './pages/Restaurants'
import Home from './pages/Home'
import Auth from './pages/Auth'

import './App.css'
import './components/styles/Global.css'

function App () {
  return (
    <div className='App'>
      <Router>
        <Header />
        <div className='content'>
          <Switch>
            <Route path='/auth'>
              <Auth />
            </Route>
            <Route path='/restaurants'>
              <Restaurants />
            </Route>
            <Route path='/'>
              <Home />
            </Route>
          </Switch>
        </div>
      </Router>
    </div>
  )
}

export default App
