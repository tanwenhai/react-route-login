import React, { PropTypes, Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect,
  withRouter
} from 'react-router-dom';

class AuthButton extends Component {
  constructor (props) {
    super(props);
  }
  render () {
    const { history } = this.props;
    return fakeAuth.isAuthenticated ? (
      <p>
        欢迎! <button onClick={() => {
          fakeAuth.signout(() => history.push('/'))
        }}>退出</button>
      </p>
    ) : (
      <p>你还没有登陆哦.</p>
    )
  }
}
AuthButton = withRouter(AuthButton);

class AuthExample extends Component {
  render () {
    return (
      <Router>
        <div>
          <AuthButton/>
          <ul>
            <li><Link to="/public">可以访问的页面</Link></li>
            <li><Link to="/protected">需要登陆的页面</Link></li>
            <li>
              <Link to="/sdf">ttt</Link>
            </li>
          </ul>
          {/* 不需要登陆 */}
          <Route path="/public" component={Public}/>
          {/* 需要登陆 */}
          <PrivateRoute path="/protected" component={Protected}/>
          <PrivateRoute path="/sdf" component={Private}/>
          {/* 登陆 */}
          <Route path="/login" component={Login}/>
        </div>
      </Router>
    );
  }
}

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true
    setTimeout(cb, 100) // fake async
  },
  signout(cb) {
    this.isAuthenticated = false
    setTimeout(cb, 100)
  }
}

class PrivateRoute extends Component {
  constructor (props) {
    super(props);
  }

  redirect (props) {
    if (fakeAuth.isAuthenticated) {
      return React.createElement(this.props.component, props);
    } else {
      return <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>;
    }
  }
  render () {
    const { component, ...rest } = this.props;

    return (
      <Route {...rest} render={this.redirect.bind(this)}/>
    );
  }
}

PrivateRoute = withRouter(PrivateRoute);

const Public = () => <h3>公共的</h3>
const Protected = () => <h3>啦啦啦</h3>
const Private = () => <h3>哈哈哈</h3>

class Login extends Component {
  constructor (props) {
    super(props);
    this.state = {
      redirectToReferrer: false
    };
  }
  login () {
    fakeAuth.authenticate(() => {
      this.setState({ redirectToReferrer: true })
    })
  }
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } }
    const { redirectToReferrer } = this.state
    
    if (redirectToReferrer) {
      return (
        <Redirect to={from}/>
      )
    }
    
    return (
      <div>
        <p>没有登陆不能访问 {from.pathname}</p>
        <button onClick={this.login.bind(this)}>登b陆</button>
      </div>
    )
  }
}

export default AuthExample