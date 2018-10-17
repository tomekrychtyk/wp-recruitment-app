import { Map, List, fromJS } from 'immutable';

import * as types from '../actions/types';

const INITIAL_STATE = Map({
  list: List(),
  loading: false,
  active: Map({
    loading: false,
    photos: List(),
  }),
});

const translateOptionToField = (option) => {
  const dict = {
    latest: 'created_at',
    oldest: 'created_at',
    popular: 'likes',
  };

  return dict[option];
};

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.SECTION_GET_MANY: {
      return state.set('loading', true);
    }

    case types.SECTION_SET_MANY: {
      return state.withMutations((map) => {
        map.set('loading', false)
          .set('list', fromJS(payload.sections));
      });
    }

    case types.SECTION_GET: {
      return state.setIn(['active', 'loading'], true);
    }

    case types.SECTION_SET: {
      const updatedSection = {
        ...payload.section,
        loading: false,
      };

      return state.mergeIn(['active'], fromJS(updatedSection));
    }

    case types.PHOTO_SET_MANY: {
      const photos = state.getIn(['active', 'photos']).toJS();
      photos.push(...payload.photos);
      return state.setIn(['active', 'photos'], fromJS(photos));
    }

    case types.PHOTO_LIST_RELOAD: {
      return state.setIn(['active', 'photos'], fromJS(payload.photos));
    }

    case types.PHOTO_LIST_SORT_LOCAL: {
      const { orderBy } = payload;
      const photos = state.getIn(['active', 'photos']);
      const field = translateOptionToField(orderBy);

      const sortedPhotos = photos.sort((a, b) => {
        if (a.get(field) === b.get(field)) {
          return 0;
        }

        if (orderBy === 'oldest') {
          return a.get(field) < b.get(field) ? -1 : 1;
        }

        return a.get(field) < b.get(field) ? 1 : -1;
      });

      return state.setIn(['active', 'photos'], sortedPhotos);
    }

    case types.SECTION_ACTIVE_CLEAR: {
      return state.set('active', Map({
        loading: false,
        photos: List(),
      }));
    }

    default: {
      return state;
    }
  }
};

export default reducer;
