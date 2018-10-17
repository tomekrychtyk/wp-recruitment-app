import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './PhotoItem.less';

const formatDate = date => new Date(date).toLocaleDateString();

const PhotoItem = ({
  photo,
  currentlyHovered,
  handleMouseEnter,
  handleMouseLeave,
}) => (
  <div
    className={styles.photoItem}
    key={photo.id}
    id={photo.id}
    onMouseLeave={handleMouseLeave}
  >
    <img
      src={photo.urls.small}
      onMouseEnter={handleMouseEnter}
      id={photo.id}
      alt={`By ${photo.user.name}`}
    />
    {
      currentlyHovered === photo.id
      && (
      <Link to={`/photo/${photo.id}`} className={styles.photoInfo}>
        <ul className={styles.details}>
          <li>
            <span>created at: </span>
            <b>{formatDate(photo.created_at)}</b>
          </li>
          <li>
            <span>likes: </span>
            <b>{photo.likes}</b>
          </li>
        </ul>
        <div className={styles.cta}>See full image</div>
      </Link>
      )
    }
  </div>
);

PhotoItem.propTypes = {
  photo: PropTypes.shape({
    id: PropTypes.string,
    created_at: PropTypes.string,
    likes: PropTypes.number,
    urls: PropTypes.shape({
      full: PropTypes.string,
      raw: PropTypes.string,
      regular: PropTypes.string,
      small: PropTypes.string,
      thumb: PropTypes.string,
    }),
  }).isRequired,
  currentlyHovered: PropTypes.string,
  handleMouseEnter: PropTypes.func,
  handleMouseLeave: PropTypes.func,
};

PhotoItem.defaultProps = {
  currentlyHovered: '',
  handleMouseEnter: () => null,
  handleMouseLeave: () => null,
};

export default PhotoItem;
