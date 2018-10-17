import { Map, fromJS } from 'immutable';

import * as types from '../actions/types';

const INITIAL_STATE = Map({
  loading: false,
  data: Map(),
});

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.PHOTO_GET: {
      return state.set('loading', true);
    }

    case types.PHOTO_SET: {
      return state.withMutations((map) => {
        map.set('data', fromJS(payload.photo))
          .set('loading', false);
      });
    }

    case types.PHOTO_CLEAR: {
      return state.set('data', Map());
    }

    default: {
      return state;
    }
  }
};

export default reducer;
