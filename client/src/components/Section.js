import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Map } from 'immutable';
import InfiniteScroll from 'react-infinite-scroller';

import styles from './Section.less';
import * as actions from '../redux/actions';
import { photoSortOptions, photosPerPage, defaultPhotosOrder } from '../config';
import PhotoItem from './PhotoItem';

class Section extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: defaultPhotosOrder,
      currentlyHovered: null,
    };

    this.handleLoadMore = this.handleLoadMore.bind(this);
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseEnter.bind(this);
    this.handleSort = this.handleSort.bind(this);
  }

  componentDidMount() {
    const { sectionGet, match: { params: { id } } } = this.props;
    sectionGet(id);
  }

  componentWillUnmount() {
    const { sectionActiveClear } = this.props;
    sectionActiveClear();
  }

  handleLoadMore(page) {
    const { section, photoGetMany } = this.props;
    const { orderBy } = this.state;
    photoGetMany({
      sectionId: section.get('id'),
      page,
      limit: photosPerPage,
      orderBy,
    });
  }

  handleSort(e) {
    this.setState({
      orderBy: e.target.value,
    });

    const { section, photoGetMany, photoListSortLocal } = this.props;
    const photos = section.get('photos').toJS();

    if (photos.length < section.get('total_photos')) {
      // If we don't have all photos loaded we have to reload the list of photos
      // by calling the API endpoint again and getting the initial ${photosPerPage}
      // amount of photos sorted by the given order.
      photoGetMany({
        sectionId: section.get('id'),
        page: 1,
        limit: photosPerPage,
        orderBy: e.target.value,
        reload: true,
      });
    } else {
      // If we've got all photos loaded in the Redux state already
      // there's no need in calling the API again.
      // We can sort the photos locally as we're sure we won't miss any.
      photoListSortLocal(e.target.value);
    }
  }

  handleMouseEnter(e) {
    this.setState({ currentlyHovered: e.target.id });
  }

  handleMouseLeave() {
    this.setState({ currentlyHovered: null });
  }

  render() {
    const { section } = this.props;
    const { currentlyHovered } = this.state;
    if (section.get('loading')) {
      return <div className={styles.section}>Loading section</div>;
    }
    const photos = section.get('photos').toJS();
    const hasMore = photos.length < section.get('total_photos');

    const sortOptions = photoSortOptions.map(option => (
      <option key={option.id} value={option.id}>{option.title}</option>
    ));

    return (
      <div className={styles.section}>
        <div className={styles.filters}>
          <span>Order by:</span>
          <select onChange={this.handleSort}>
            {sortOptions}
          </select>
        </div>
        <InfiniteScroll
          className={styles.sectionList}
          pageStart={0}
          loadMore={this.handleLoadMore}
          hasMore={hasMore}
          loader={<div className="loader" key={0}>Loading...</div>}
        >
          {
            photos.map(photo => (
              <PhotoItem
                key={photo.id}
                currentlyHovered={currentlyHovered}
                photo={photo}
                handleMouseEnter={this.handleMouseEnter}
                handleMouseLeave={this.handleMouseLeave}
              />
            ))
          }
        </InfiniteScroll>
      </div>
    );
  }
}

Section.propTypes = {
  sectionGet: PropTypes.func.isRequired,
  photoGetMany: PropTypes.func.isRequired,
  photoListSortLocal: PropTypes.func.isRequired,
  sectionActiveClear: PropTypes.func.isRequired,
  section: PropTypes.instanceOf(Map),
  match: PropTypes.shape({
    path: PropTypes.string,
    url: PropTypes.string,
    isExact: PropTypes.bool,
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

Section.defaultProps = {
  section: Map({ loading: true }),
};

const mapStateToProps = state => ({
  section: state.sections.get('active'),
});

export default connect(mapStateToProps, {
  sectionGet: actions.sectionGet,
  photoGetMany: actions.photoGetMany,
  photoListSortLocal: actions.photoListSortLocal,
  sectionActiveClear: actions.sectionActiveClear,
})(Section);
