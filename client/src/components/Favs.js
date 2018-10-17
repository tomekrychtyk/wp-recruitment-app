import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import * as actions from '../redux/actions';
import styles from './Favs.less';
import Spinner from './ui/Spinner';
import requireAuth from '../common/hoc/requireAuth';

class Favs extends Component {
  constructor(props) {
    super(props);

    this.handleRemove = this.handleRemove.bind(this);
  }

  componentDidMount() {
    const { photoFavGetMany, auth } = this.props;
    if (auth) {
      photoFavGetMany();
    }
  }

  handleRemove(e) {
    const { photoFavDelete } = this.props;
    photoFavDelete(e.target.id);
  }

  render() {
    const { loading, photos } = this.props;
    let favs = <Spinner />;

    if (!loading) {
      favs = photos.toJS().map(({ photoId, thumbUrl }) => (
        <div key={photoId} className={styles.favItem}>
          <img src={thumbUrl} alt={photoId} />
          <button
            type="button"
            onClick={this.handleRemove}
            id={photoId}
          >
            Remove
          </button>
        </div>
      ));
    }

    return (
      <div className={styles.favs}>
        {favs}
      </div>
    );
  }
}

Favs.propTypes = {
  photoFavGetMany: PropTypes.func.isRequired,
  photoFavDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  photos: PropTypes.instanceOf(List),
  auth: PropTypes.bool,
};

Favs.defaultProps = {
  loading: true,
  photos: List(),
  auth: false,
};

const mapStateToProps = state => ({
  loading: state.runtime.getIn(['currentUser', 'favs', 'loading']),
  photos: state.runtime.getIn(['currentUser', 'favs', 'list']),
  auth: state.runtime.getIn(['currentUser', 'loggedIn']),
});

export default connect(mapStateToProps, {
  photoFavGetMany: actions.photoFavGetMany,
  photoFavDelete: actions.photoFavDelete,
})(requireAuth(Favs));
