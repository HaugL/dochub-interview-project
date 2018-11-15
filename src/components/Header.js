import React, { Component } from 'react';
import { Navbar } from 'react-bootstrap'
import './styles/Header.sass'
import logo from '../../public/assets/logo.svg'

class Header extends Component {
  render(){
    return (
      <div className='app-header'>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <img alt="storm.io logo" src={logo} />
              <div className='company-title-container'>
                <a href="/">Storm.io</a>
              </div>
            </Navbar.Brand>
          </Navbar.Header>
        </Navbar>
      </div>
    )
  }
}

export default Header
