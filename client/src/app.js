import React, {Fragment, Component} from 'react';
import logo from './assets/images/logo.svg';
import './assets/css/app.css';
import {
  BrowserRouter as Router,
  Route,
  NavLink,
  Redirect,
} from 'react-router-dom';
import Register from './routes/register';
import Login from './routes/login';
import client from './modules/feathers';
import Profile from './routes/profile';
import Chat from './routes/chat';
import userInfo from './modules/user-info';

const checkActive = (match, location) => {
  return location && location.pathname === '/';
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: userInfo.get(),
    };
  }

  componentDidMount() {
    // Try to authenticate with the JWT stored in localStorage
    client.authenticate().catch(errors => this.setState({user: null}));

    // On successfull login
    client.on('authenticated', payload => {
      this.setState({user: payload.user});
      userInfo.set(payload.user);
    });

    // On logout reset all all local state (which will then show the login screen)
    client.on('logout', () => {
      userInfo.remove();
      this.setState({
        user: null,
      });
    });
  }

  handleLogout(e) {
    e.preventDefault();

    client.logout();
  }

  requireLogin(component) {
    if (this.state.user) {
      return component;
    }

    return <Redirect to="/login" />;
  }

  render() {
    return (
      <Router>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <div>
              {this.state.user ? (
                <Fragment>
                  <NavLink isActive={checkActive} className="App-link" to="/">
                    Chat
                  </NavLink>
                  <NavLink className="App-link" to="/profile">
                    Profile
                  </NavLink>
                  <a
                    href="/logout"
                    onClick={this.handleLogout.bind(this)}
                    className="App-link"
                  >
                    Log out
                  </a>
                </Fragment>
              ) : (
                <Fragment>
                  <NavLink className="App-link" to="/login">
                    Login
                  </NavLink>
                  <NavLink className="App-link" to="/register">
                    Register
                  </NavLink>
                </Fragment>
              )}
            </div>
          </header>
          <div className="App-content">
            <Route
              exact
              path="/"
              render={() => <Chat user={this.state.user} />}
            />
            <Route
              path="/profile"
              render={() =>
                this.requireLogin(<Profile user={this.state.user} />)
              }
            />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
