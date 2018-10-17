import React from 'react';

import styles from './RandomPhoto.less';

const RandomPhoto = props => (
  <div className={styles.mainPhoto} style={{ backgroundImage: `url(${props.photo})` }} />
);

export default RandomPhoto;
