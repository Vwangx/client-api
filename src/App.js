import React from 'react';
import './App.scss';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import AuthPage from './pages/AuthPage';
import { HomePage } from './pages/HomePage';
import UsersPage from './pages/UsersPage';
import { CasesPage } from './pages/CasesPage';
import TechnologiesPage from './pages/TechnologiesPage';
import IndustriesPage from './pages/IndustriesPage';
import { CreatePage } from './pages/CreatePage';
import ProfilePage from './pages/ProfilePage';
import CreateUser from './pages/CreateUser';
import UpdateUserPage from './pages/UpdateUserPage';

import Header from './layouts/Header'


function App({ app }) {  
  let isAuth = localStorage.getItem('token') ? true : false

  return (
      <Router>
        { isAuth && <Header /> }
        { isAuth ? (
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/users" component={UsersPage}/>
            <Route exact path="/cases" component={CasesPage}/>
            <Route exact path="/technologies" component={TechnologiesPage}/>
            <Route exact path="/industries" component={IndustriesPage}/>
            <Route exact path="/create" component={CreatePage}/>
            <Route exact path="/usercreate" component={CreateUser} />
            <Route exact path="/profile" component={ProfilePage} />
            <Route exact path="/updateuser" component={UpdateUserPage} />
            <Redirect to="/"/>
          </Switch>
          ) : (
            <Switch>
              <Route exact path="/login" component={AuthPage} />
              <Redirect to="/login"/>
            </Switch>
          )
        }
      </Router>
  )
}

const mapStateToProps = state => {
  return state
}

export default connect(mapStateToProps, null)(App);
