import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom';
import AuthPage from '../pages/AuthPage';
import { connect } from 'react-redux' 
import { HomePage } from '../pages/HomePage';
import { UsersPage } from '../pages/UsersPage';
import { CasesPage } from '../pages/CasesPage';
import { TechnologiesPage } from '../pages/TechnologiesPage';
import { IndustriesPage } from '../pages/IndustriesPage';
import { CreatePage } from '../pages/CreatePage';

const useRoutes = isAuth => {
    if (isAuth) {
        return (
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/users" component={UsersPage}/>
                <Route exact path="/cases" component={CasesPage}/>
                <Route exact path="/technologies" component={TechnologiesPage}/>
                <Route exact path="/industries" component={IndustriesPage}/>
                <Route exact path="/create" component={CreatePage}/>
                <Redirect to="/"/>
            </Switch>
        )
    } else {
        return (
            <Switch>
                <Route exact path="/login" component={AuthPage} />
                <Redirect to="/login"/>
            </Switch>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return state
}

export default connect(mapStateToProps, null)(useRoutes);