import React, { Component } from 'react';
import { Provider } from 'react-redux';
import Loadable from 'react-loadable';
import { Router, Route, browserHistory } from 'react-router'
import { getStore } from './utils/store';
import HttpsRedirect from 'react-https-redirect';
import Header from './components/Header'
import './general.sass'
import './bootstrap.min.css'

class Loading extends Component { render(){ return null }  }
// const Page = Loadable({loader: () => import("./path.to/page"), loading: Loading });
const Home = Loadable({loader: () => import("./containers/HomeContainer"), loading: Loading });

class App extends Component {
  render() {
    return (
        <Provider store={ getStore() }>
          <HttpsRedirect>
            <div>
              <Header />
              { this.renderRouter() }
            </div>
          </HttpsRedirect>
        </Provider>
    );
}

  renderRouter(){
    return (
      <Router history={ browserHistory } onUpdate={() => window.scrollTo(0, 0)}>
        <Route path="/" component={ Home } />
      </Router>
    )
  }
}

export default App;
