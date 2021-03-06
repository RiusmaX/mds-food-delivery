import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom'

import Header from './components/Header'

import Restaurants from './pages/Restaurants'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Restaurant from './pages/Restaurant'

import './App.css'
import './components/styles/Global.css'
import Cart from './components/Cart'
import { CartProvider } from './contexts/CartContext'
import { AuthProvider } from './contexts/AuthContext'
import Order from './pages/Order'
import Success from './pages/Success'
import Cancel from './pages/Cancel'
import Upload from './pages/Upload'

function App () {
  return (
    <div className='App'>
      <Router>
        <CartProvider>
          <AuthProvider>
            <Header />
            <Cart />
            <div className='content'>
              <Switch>
                <Route path='/upload'>
                  <Upload />
                </Route>
                <Route path='/cancel'>
                  <Cancel />
                </Route>
                <Route path='/success'>
                  <Success />
                </Route>
                <Route path='/order'>
                  <Order />
                </Route>
                <Route path='/restaurant/:id'>
                  <Restaurant />
                </Route>
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
          </AuthProvider>
        </CartProvider>
      </Router>
    </div>
  )
}

export default App
