import { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Auth } from "aws-amplify";

import { loggedInSet } from '../redux/actions';

class Logout extends Component {
  async componentDidMount() {
    await Auth.signOut();
    const { loggedInSet } = this.props;
    loggedInSet(false);
    this.props.history.push('/');
  }

  render() {
    return null;
  }
}

Logout.propTypes = {
  loggedInSet: PropTypes.func.isRequired,
};

export default connect(null, { loggedInSet })(Logout);