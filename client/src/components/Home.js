import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import * as actions from '../redux/actions';

import Spinner from './ui/Spinner';
import RandomPhoto from './ui/RandomPhoto';
import styles from './Home.less';

class Home extends Component {
  componentDidMount() {
    const { randomPhotoGet, randomPhoto } = this.props;

    if (randomPhoto === '') {
      randomPhotoGet();
    }
  }

  render() {
    const { randomPhoto, loading } = this.props;
    if (loading) {
      return <Spinner className={styles.welcomeCopy} />;
    }

    return (
      <div>
        <RandomPhoto photo={randomPhoto} />
        <div className={styles.welcomeCopy}>
          <span>All your favourite Unsplash pictures</span>
          <span className={styles.smallerCopy}>in one place!</span>

          <div className={styles.cta}>
            <Link to="/sections">Start browsing now!</Link>
          </div>
        </div>
      </div>
    );
  }
}

Home.propTypes = {
  randomPhotoGet: PropTypes.func.isRequired,
  randomPhoto: PropTypes.string,
  loading: PropTypes.bool,
};

Home.defaultProps = {
  randomPhoto: '',
  loading: true,
};

const mapStateToProps = state => ({
  randomPhoto: state.runtime.get('randomPhoto'),
  loading: state.runtime.get('loading'),
});

export default connect(mapStateToProps, {
  randomPhotoGet: actions.randomPhotoGet,
})(Home);
