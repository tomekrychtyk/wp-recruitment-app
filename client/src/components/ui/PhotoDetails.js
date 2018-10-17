import React from 'react';
import PropTypes from 'prop-types';
import { Map } from 'immutable';

import styles from './PhotoDetails.less';

const PhotoDetails = (props) => {
  const { photo } = props;

  return (
    <ul className={styles.details}>
      <li>
        <span>{`Created: ${photo.get('created_at')}`}</span>
      </li>

      <li>
        <span>{`Author: ${photo.getIn(['user', 'name'])}`}</span>
      </li>

      <li>
        <span>{`${photo.get('likes')} likes`}</span>
      </li>

      <li>
        <span>{`${photo.get('views')} views`}</span>
      </li>

      {
        photo.get('location') && (
          <li>{`Location: ${photo.getIn(['location', 'title'])}`}</li>
        )
      }
    </ul>
  );
};

PhotoDetails.propTypes = {
  photo: PropTypes.instanceOf(Map),
};

PhotoDetails.defaultProps = {
  photo: Map(),
};

export default PhotoDetails;
