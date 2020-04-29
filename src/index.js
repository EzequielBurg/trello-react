import React from 'react';
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Route, Switch } from 'react-router' // react-router v4/v5
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './store'
import Home from './containers/Home'
import './index.scss'
import Localforage from 'localforage'

const db = Localforage.createInstance({   // banco de dados offline
  name: 'Trello',
  driver: Localforage.INDEXEDDB,
  description: 'Store cards and tasks from Trello',
  version: 1.0
})

db.getItem('Trello').then(value => value).then(value => configureStore(value)).then((store) => {
  ReactDOM.render(
    <>
      <header id="header">
          <nav id="navbar-center" className="navbar navbar-default navbar-fixed-top">
          <div className="container-fluid">
              <div className="navbar-header">
                  <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar">
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                      <span className="icon-bar"></span>
                  </button>
                  <a href="javascript;void:0" className="navbar-brand">
                      <img src="/images/tilt.jpeg" alt=""/>
                  </a>
              </div>
              <div className="navbar-collapse collapse" id="navbar">
                  <ul className="nav navbar-nav">
                  </ul>
              </div>
          </div>
        </nav>
      </header>
      <main className="container-fluid" id="main">
        <Provider store={store}>
          <ConnectedRouter history={history}>
            <>
              <Switch>
                <Route exact path="/" component={ Home } />
              </Switch>
            </>
          </ConnectedRouter>
        </Provider>
      </main>
    </>,
    document.getElementById('root')
  )

  store.subscribe(() => db.setItem('Trello', store.getState()))
})
