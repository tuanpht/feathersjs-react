import React, {Component, Fragment} from 'react';
import {Link} from 'react-router-dom';
import client from '../modules/feathers.js';
import '../assets/css/chat.css';
import {SERVICE} from '../modules/constants';

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      users: [],
    };
  }

  componentDidMount() {
    client.on('authenticated', payload => {
      client
        .service(SERVICE.USER)
        .find()
        .then(users => console.log(users));
    });
  }

  render() {
    const content = this.props.user ? (
      <div className="row-parent">
        <div className="sidebar">1211</div>
        <div className="content column-parent">
          <div className="messages">dfdfdfdf</div>
          <div className="input">aaaa</div>
        </div>
      </div>
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
