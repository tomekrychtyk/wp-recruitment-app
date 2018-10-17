import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { login } from '../redux/actions';

import styles from './Login.less';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidUpdate() {
    const { isLoggedIn } = this.props;
    if(isLoggedIn) {
      this.props.history.push('/');
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    const { login } = this.props;
    const { email, password } = this.state;

    login(email, password);
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    });
  }

  render() {
    return (
      <div className={styles.login}>
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

          <button>Sign in</button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  login: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool,
};

Login.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.runtime.get('currentUser').get('loggedIn'),
});

export default connect(mapStateToProps, { login })(Login);