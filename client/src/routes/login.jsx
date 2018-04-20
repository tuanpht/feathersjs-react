import React, {Component} from 'react';
import client from '../modules/feathers';

class Login extends Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      errors: {},
    };
  }

  validateInput(field, value) {
    const errors = {...this.state.errors};
    if (!value) {
      errors[field] = '* Required';
    } else {
      errors[field] = null;
    }

    return errors;
  }

  setInput(field, e) {
    const {value} = e.target;
    const errors = this.validateInput(field, value);
    this.setState({
      [field]: value,
      errors: errors,
    });
  }

  handleLoginSubmit(e) {
    e.preventDefault();

    const {email, password} = this.state;

    let errors = this.validateInput('email', email);
    errors = {...errors, ...this.validateInput('password', password)};

    if (errors.email || errors.password) {
      this.setState({errors});
      return;
    }

    return client
      .authenticate({
        strategy: 'local',
        email,
        password,
      })
      .then(() => this.props.history.push('/'))
      .catch(errors => this.setState({errors}));
  }

  render() {
    return (
      <form onSubmit={this.handleLoginSubmit.bind(this)}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Your email"
            value={this.state.email}
            onChange={this.setInput.bind(this, 'email')}
          />
          {this.state.errors.email ? (
            <p className="error">{this.state.errors.email}</p>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Password"
            value={this.state.password}
            onChange={this.setInput.bind(this, 'password')}
          />
          {this.state.errors.password ? (
            <p className="error">{this.state.errors.password}</p>
          ) : null}
        </div>
        {this.state.errors.message ? (
          <p className="error">{this.state.errors.message}</p>
        ) : null}
        <div className="form-group">
          <button className="btn">Login</button>
        </div>
      </form>
    );
  }
}

export default Login;
