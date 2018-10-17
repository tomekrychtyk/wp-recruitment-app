import 'regenerator-runtime/runtime';
import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Auth } from 'aws-amplify';

import Header from './ui/Header';
import * as actions from '../redux/actions';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      menuOpen: false,
    };

    this.handleMenuOpen = this.handleMenuOpen.bind(this);
  }

  async componentDidMount() {
    const { loggedInSet, photoFavGetMany } = this.props;
    try {
      await Auth.currentSession();
      loggedInSet(true);
      photoFavGetMany();
    } catch (e) {
      // TODO: Handle the exception
    }
  }

  handleMenuOpen() {
    const { menuOpen } = this.state;
    this.setState({ menuOpen: !menuOpen });
  }

  render() {
    const { menuOpen } = this.state;
    const { isLoggedIn, children } = this.props;
    return (
      <div>
        <Header
          isLoggedIn={isLoggedIn}
          menuOpen={menuOpen}
          onMenuOpen={this.handleMenuOpen}
        />
        {children}
      </div>
    );
  }
}

App.propTypes = {
  isLoggedIn: PropTypes.bool,
  loggedInSet: PropTypes.func.isRequired,
  photoFavGetMany: PropTypes.func.isRequired,
};

App.defaultProps = {
  isLoggedIn: false,
};

const mapStateToProps = state => ({
  isLoggedIn: state.runtime.get('currentUser').get('loggedIn'),
});

export default withRouter(connect(mapStateToProps, {
  loggedInSet: actions.loggedInSet,
  photoFavGetMany: actions.photoFavGetMany,
})(App));
