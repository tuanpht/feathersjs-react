import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';

class Chat extends Component {
  render() {
    const content = this.props.user ? (
      <h2>Ok</h2>
    ) : (
      <Fragment>
        <h2>Welcome you</h2>
        <p>
          <Link to="/login">Login</Link> or <Link to="/register">Register</Link>
          &nbsp; to start.
        </p>
      </Fragment>
    );

    return content;
  }
}

export default Chat;
