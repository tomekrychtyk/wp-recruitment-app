import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import styles from './SectionItem.less';
import PhotoThumb from './ui/PhotoThumb';

const Section = ({ id, title, thumbs }) => {
  return (
    <div className={styles.sectionItem}>
      <div className={styles.sectionInner}>
        <h3>
          <Link to={`/section/${id}`}>{title}</Link>
        </h3>
        {
          thumbs.map(thumb => <PhotoThumb key={thumb.id} url={thumb.urls.thumb} />)
        }
      </div>
    </div>
  );
}

Section.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  thumbs: PropTypes.array.isRequired,
};

export default Section;