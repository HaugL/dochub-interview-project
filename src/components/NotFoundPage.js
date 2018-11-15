import React, { Component } from 'react';
import './styles/NotFoundPage.sass'

class Home extends Component {
  render(){
    return (
      <div className='container not-found-page'>
        <h1>Uh Oh!</h1>
        <iframe title="404-gif" src="https://giphy.com/embed/26u6dryuZH98z5KuY" width="350" height="360" frameBorder="0" className="giphy-embed" allowFullScreen/>
        <h3>This Page Doesn't Exist</h3>
      </div>
    )
  }
}

export default Home
