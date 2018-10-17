import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Map, List } from 'immutable';
import { FacebookProvider, Like } from 'react-facebook';

import * as actions from '../redux/actions';
import styles from './Photo.less';
import Spinner from './ui/Spinner';
import PhotoDetails from './ui/PhotoDetails';
import { findByValue } from '../common/libs/immutablejs-helpers';

class Photo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFaved: false,
    };
  }

  componentDidMount() {
    const {
      photoGet,
      match: { params: { id } },
    } = this.props;

    photoGet(id);

    this.handleAddToFav = this.handleAddToFav.bind(this);
    this.checkFav();
  }

  componentDidUpdate() {
    this.checkFav();
  }

  componentWillUnmount() {
    const { photoClear } = this.props;
    photoClear();
  }

  checkFav() {
    const { favs, match: { params: { id } } } = this.props;
    const { isFaved } = this.state;

    if (!isFaved) {
      const check = findByValue(favs, 'unsplashId', id);
      if (check && check.size) {
        this.setState({ isFaved: true });
      }
    }
  }

  handleAddToFav() {
    const {
      photo,
      match: { params: { id } },
      photoFavAdd,
      photoFavDelete,
    } = this.props;
    const { isFaved } = this.state;

    this.setState({
      isFaved: !isFaved,
    });

    if (!isFaved) {
      photoFavAdd({
        id,
        thumbUrl: photo.getIn(['urls', 'thumb']),
        regularUrl: photo.getIn(['urls', 'regular']),
      });
    } else {
      const { favs } = this.props;
      const favedData = findByValue(favs, 'unsplashId', id);
      photoFavDelete(favedData.get('photoId'));
    }
  }

  render() {
    let photo = <Spinner />;
    const {
      loading,
      photo: data,
      loggedIn,
    } = this.props;
    const { isFaved } = this.state;

    if (!loading) {
      photo = (
        <FacebookProvider appId="2147102608655158">
          <div className={styles.container}>
            <img
              src={data.getIn(['urls', 'regular'])}
              alt={`by ${data.getIn(['user', 'name'])}`}
            />
          </div>
          <PhotoDetails photo={data} />
          <div className={styles.socialActions}>
            {
              loggedIn && (
                <div className={styles.addToFavs}>
                  <button
                    type="button"
                    onClick={this.handleAddToFav}
                  >
                    {isFaved ? 'Remove from favourites' : 'Add to favourites'}
                  </button>
                </div>
              )
            }
            <div className={styles.likeButton}>
              <Like href={window.location.href} colorScheme="dark" showFaces share />
            </div>
          </div>
        </FacebookProvider>
      );
    }

    return (
      <div className={styles.photo}>
        {photo}
      </div>
    );
  }
}

Photo.propTypes = {
  photoGet: PropTypes.func.isRequired,
  photoClear: PropTypes.func.isRequired,
  photoFavAdd: PropTypes.func.isRequired,
  photoFavDelete: PropTypes.func.isRequired,
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  loading: PropTypes.bool,
  photo: PropTypes.instanceOf(Map),
  loggedIn: PropTypes.bool,
  favs: PropTypes.instanceOf(List),
};

Photo.defaultProps = {
  loading: true,
  photo: Map(),
  loggedIn: false,
  favs: List(),
};

const mapStateToProps = state => ({
  photo: state.photo.get('data'),
  loading: state.photo.get('loading'),
  loggedIn: state.runtime.getIn(['currentUser', 'loggedIn']),
  favs: state.runtime.getIn(['currentUser', 'favs', 'list']),
});

export default connect(mapStateToProps, {
  photoGet: actions.photoGet,
  photoClear: actions.photoClear,
  photoFavAdd: actions.photoFavAdd,
  photoFavDelete: actions.photoFavDelete,
})(Photo);
