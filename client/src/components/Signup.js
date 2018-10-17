import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Signup.less';
import { signup } from '../redux/actions';

class Signup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      confirmPassword: '',
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate() {
    const { signedUp } = this.props;

    if(signedUp) {
      this.props.history.push('/');
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    })
  }

  handleSubmit(e) {
    e.preventDefault();
    const { signup } = this.props;
    const { email, password } = this.state;

    signup(email, password);
    this.props.history.push('/confirm');
  }

  render() {
    return (
      <div className={styles.signup}>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>
              E-mail:
            </label>
            <input
              onChange={this.handleChange} 
              type="text" 
              id="email"
              value={this.state.email}
            />
          </div>

          <div>
            <label>
              Password:
            </label>
            <input 
              onChange={this.handleChange}
              type="password" 
              id="password"
              value={this.state.password}
            />
          </div>

          <div>
            <label>
              Confirm password:
            </label>
            <input 
              onChange={this.handleChange}
              type="password" 
              id="confirmPassword"
              value={this.state.confirmPassword}
            />
          </div>
          <button>Sign up</button>
        </form>
      </div>
    );
  }
}

Signup.propTypes = {
  signup: PropTypes.func.isRequired,
  signedUp: PropTypes.bool,
};

Signup.defaultProps = {
  signedUp: false,
};

const mapStateToProps = state => ({
  signedUp: state.runtime.get('currentUser').get('signedUp'),
});

export default connect(mapStateToProps, { signup })(Signup);