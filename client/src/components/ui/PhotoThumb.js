import React from 'react';
import PropTypes from 'prop-types';

import styles from './PhotoThumb.less';

const PhotoThumb = ({ url }) => (
  <div className={styles.thumb}>
    <img src={url} />
  </div>
);

PhotoThumb.propTypes = {
  url: PropTypes.string.isRequired,
}

export default PhotoThumb;