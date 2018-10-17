import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { List } from 'immutable';

import * as actions from '../redux/actions';

import styles from './SectionList.less';
import Spinner from './ui/Spinner';
import SectionItem from './SectionItem';

class SectionList extends Component {
  componentDidMount() {
    const { sectionGetMany, list } = this.props;

    if (!list.size) {
      sectionGetMany();
    }
  }

  render() {
    const { loading, list } = this.props;
    let sections = <Spinner />;
    if (!loading) {
      sections = list.toJS().map(section => (
        <SectionItem
          key={section.id}
          id={section.id}
          title={section.title}
          thumbs={section.preview_photos}
        />
      ));
    }

    return (
      <div className={styles.sectionList}>
        {sections}
      </div>
    );
  }
}

SectionList.propTypes = {
  sectionGetMany: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  list: PropTypes.instanceOf(List),
};

SectionList.defaultProps = {
  loading: true,
  list: List(),
};

const mapStateToProps = state => ({
  loading: state.sections.get('loading'),
  list: state.sections.get('list'),
});

export default connect(mapStateToProps, {
  sectionGetMany: actions.sectionGetMany,
})(SectionList);
