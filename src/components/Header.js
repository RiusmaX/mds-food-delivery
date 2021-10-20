import React from 'react';
import { Link } from 'react-router-dom'

import './styles/Header.css'

class Header extends React.Component {
  render() {
    return (
      <div className='menu-container'>
        <div className='logo-container'>
          <img src='/images/logo512.png' className='logo' />
        </div>
        <nav className='menu'>
          <ul className='menu-list'>
            <li className='menu-item'>
              <Link to='/'>Accueil</Link>
            </li>
            <li className='menu-item'>
              <Link to='/restaurants'>Restaurants</Link>
            </li>
            <li className='menu-item'>
              <Link to='/auth'>Auth</Link>
            </li>
          </ul>
        </nav>
      </div>
    )
  }
}

export default Header;
