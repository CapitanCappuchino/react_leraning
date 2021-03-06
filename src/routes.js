import React, { Component } from 'react';
import { 
  Switch, 
  Route, 
  Redirect,
  withRouter }              from 'react-router-dom';
import { connect }          from 'react-redux';

import ProfilePage          from './pages/profilePage';
import NewsPage             from './pages/newsPage';
import AuthPage             from './pages/authPage';
import HomePage             from './pages/homePage';
import NotFoundPage         from './pages/notFoundPage';
import LoadingPage          from './pages/loadingPage';
import { login }            from './redux/actions/authAction';

class Routes extends Component {
  componentDidMount = () => {
    if(localStorage.getItem('isAutintificated') === 'true' 
      && this.props.auth.isAutintificated === false){
        const user = {
          'email':    localStorage.getItem('email'),
          'password': localStorage.getItem('password')
        };
        this.props.login(user);
      }
  }

  render() {
    const { auth } = this.props;
    return (
      <div>
        <Switch>
          <Route exact path='/' component={ HomePage } />  
          <Route path='/login'  component={ AuthPage } />
          <Route path='/news'   component={ NewsPage } />
          <PrivateRoute 
            storageAuth={localStorage.getItem('isAutintificated') === 'true'}
            stateAuth={auth.isAutintificated}
            path='/profile' 
            component={ ProfilePage }
          />
          <Route component={ NotFoundPage } />
          </Switch>
      </div>
    );
  }
} 

function PrivateRoute ({component: Component, storageAuth, stateAuth, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => storageAuth && stateAuth
        ? <Component {...props} />
        : storageAuth 
          ? <LoadingPage />
          : <Redirect to='/login' />}
    />
  )
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

const mapDispatchToProps = (dispatch) => ({
  login: (user) => dispatch(login(user))
})

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Routes)
);
