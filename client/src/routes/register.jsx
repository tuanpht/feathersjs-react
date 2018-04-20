import React, {Component} from 'react';
import client from '../modules/feathers';
import {SERVICE} from '../modules/constants';

class Register extends Component {
  constructor() {
    super();

    this.passwordMinLength = 6;

    this.state = {
      email: '',
      password: '',
      rePassword: '',
      errors: {},
    };
  }

  handleEmailChange(e) {
    const {value} = e.target;
    const errors = {...this.state.errors};
    if (!value) {
      errors.email = 'Email is required!';
    } else {
      errors.email = null;
    }
    this.setState({
      email: value,
      errors: errors,
    });
  }

  validateRequire(fields) {
    let errors = {};
    for (let field of fields) {
      if (!this.state[field]) {
        errors[field] = '* Required!';
      }
    }

    return errors;
  }

  handlePasswordChange(e) {
    const {value} = e.target;
    this.setState(prevState => {
      const errors = {...prevState.errors};
      if (!value || value.length < this.passwordMinLength) {
        errors.password = `Password must be at least ${
          this.passwordMinLength
        } characters!`;
      } else {
        errors.password = null;
      }

      if (value !== prevState.rePassword) {
        errors.rePassword = 'Password does not match!';
      } else {
        errors.rePassword = null;
      }

      return {
        password: value,
        errors: errors,
      };
    });
  }

  handleRePasswordChange(e) {
    const {value} = e.target;
    this.setState(prevState => {
      const errors = {...prevState.errors};

      if (value !== prevState.password) {
        errors.rePassword = 'Password does not match!';
      } else {
        errors.rePassword = null;
      }

      return {
        rePassword: value,
        errors: errors,
      };
    });
  }

  handleRegisterSubmit(e) {
    e.preventDefault();

    let errors = this.validateRequire(['email', 'password', 'rePassword']);

    if (Object.keys(errors).length !== 0) {
      this.setState({errors});
      return;
    }

    const {email, password, rePassword} = this.state;

    return client
      .service(SERVICE.USER)
      .create({email, password, rePassword})
      .then(() => this.props.history.push('/login'))
      .catch(errors => {
        this.setState({errors});
      });
  }

  render() {
    return (
      <form onSubmit={this.handleRegisterSubmit.bind(this)}>
        <div className="form-group">
          <input
            type="email"
            className="form-control"
            placeholder="Your email"
            value={this.state.email}
            onChange={this.handleEmailChange.bind(this)}
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
            onChange={this.handlePasswordChange.bind(this)}
          />
          {this.state.errors.password ? (
            <p className="error">{this.state.errors.password}</p>
          ) : null}
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control"
            placeholder="Re-type password"
            value={this.state.rePassword}
            onChange={this.handleRePasswordChange.bind(this)}
          />
          {this.state.errors.rePassword ? (
            <p className="error">{this.state.errors.rePassword}</p>
          ) : null}
        </div>
        {this.state.errors.message ? (
          <p className="error">{this.state.errors.message}</p>
        ) : null}
        <div className="form-group">
          <button type="submit" className="btn">
            Register
          </button>
        </div>
      </form>
    );
  }
}

export default Register;
