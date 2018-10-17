import { Map, List, fromJS } from 'immutable';

import * as types from '../actions/types';
import { findIndexByValue } from '../../common/libs/immutablejs-helpers';

const INITIAL_STATE = Map({
  randomPhoto: '',
  loading: false,
  currentUser: Map({
    loggedIn: false,
    signedUp: false,
    signUpConfirmed: false,
    email: '',
    password: '',
    favs: Map({
      loading: false,
      list: List(),
    }),
  }),
});

const reducer = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
    case types.RANDOM_PHOTO_GET: {
      return state.set('loading', true);
    }

    case types.RANDOM_PHOTO_SET: {
      return state.withMutations((map) => {
        map.set('randomPhoto', payload.photo)
          .set('loading', false);
      });
    }

    case types.LOGIN_SUCCESS: {
      return state.setIn(['currentUser', 'loggedIn'], payload.loggedIn);
    }

    case types.SIGNEDUP_SET: {
      return state.setIn(['currentUser', 'signedUp'], true);
    }

    case types.SIGNUP_CONFIRM_IN_PROGRESS: {
      return state.setIn(['currentUser', 'signUpConfirmed'], false);
    }

    case types.SIGNUP_CONFIRMED: {
      return state.setIn(['currentUser', 'signUpConfirmed'], true);
    }

    case types.SIGNUP_IN_PROGRESS: {
      return state.withMutations((map) => {
        map.setIn(['currentUser', 'email'], payload.email)
          .setIn(['currentUser', 'password'], payload.password);
      });
    }

    case types.PHOTO_FAV_GET_MANY: {
      return state.setIn(['currentUser', 'favs', 'loading'], true);
    }

    case types.PHOTO_FAV_SET_MANY: {
      return state.withMutations((map) => {
        map.setIn(['currentUser', 'favs', 'loading'], false)
          .setIn(['currentUser', 'favs', 'list'], fromJS(payload.photos));
      });
    }

    case types.PHOTO_FAV_ADD: {
      const { id } = payload;
      const photo = fromJS({
        unsplashId: id,
      });

      return state.setIn(
        ['currentUser', 'favs', 'list'],
        state.getIn(['currentUser', 'favs', 'list']).push(photo),
      );
    }

    case types.PHOTO_FAV_UPDATE_ID: {
      const { unsplashId, photoId } = payload;
      const index = findIndexByValue(
        state.getIn(['currentUser', 'favs', 'list']),
        'unsplashId',
        unsplashId,
      );

      return state.setIn(['currentUser', 'favs', 'list', index, 'photoId'], photoId);
    }

    case types.PHOTO_FAV_DELETE: {
      const index = findIndexByValue(
        state.getIn(['currentUser', 'favs', 'list']),
        'photoId',
        payload.photoId,
      );

      return state.setIn(
        ['currentUser', 'favs', 'list'],
        state.getIn(['currentUser', 'favs', 'list']).delete(index),
      );
    }

    default: {
      return state;
    }
  }
};

export default reducer;
