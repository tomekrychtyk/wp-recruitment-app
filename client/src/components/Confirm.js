import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import styles from './Confirm.less';
import { signUpConfirm } from '../redux/actions';

class Confirm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: props.email,
      code: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidUpdate(prevProps) {
    if(prevProps.email !== this.props.email) {
      this.setState({ email: this.props.email });
    }

    if(this.props.signUpConfirmed) {
      this.props.history.push('/');
    }
  }

  handleChange(e) {
    this.setState({
      [e.target.id]: e.target.value,
    }); 
  }

  handleSubmit(e) {
    e.preventDefault();
    const { signUpConfirm, password } = this.props;
    const { email, code } = this.state;
    signUpConfirm(email, code, password);
  }
  
  render() {
    return (
      <div className={styles.confirm}>
        <h2>Please check your inbox and enter your confirmation code</h2>
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
              Code:
            </label>
            <input 
              onChange={this.handleChange}
              type="text" 
              id="code"
              value={this.state.code}
            />
          </div>
          <button>Confirm</button>
        </form>
      </div>
    );
  }
}

Confirm.propTypes = {
  signUpConfirm: PropTypes.func.isRequired,
  email: PropTypes.string,
  password: PropTypes.string,
  signUpConfirmed: PropTypes.bool,
};

Confirm.defaultProps = {
  email: '',
  password: '',
  signUpConfirmed: false,
}

const mapStateToProps = state => ({
  email: state.runtime.getIn(['currentUser', 'email']),
  password: state.runtime.getIn(['currentUser', 'password']),
  signUpConfirmed: state.runtime.getIn(['currentUser', 'signUpConfirmed']),
});

export default connect(mapStateToProps, { signUpConfirm })(Confirm);