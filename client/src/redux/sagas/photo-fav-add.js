import { takeLatest, put } from 'redux-saga/effects';
import { API } from 'aws-amplify';

import log from '../../common/libs/logger';
import { PHOTO_FAV_ADD } from '../actions/types';
import { photoFavUpdateId } from '../actions';

export function* photoFavAdd({ payload: { id, thumbUrl, regularUrl } }) {
  log.info('photoFavAdd fired...', id, thumbUrl, regularUrl);

  const promise = API.post('unsplashed', '/photo/create', {
    body: {
      unsplashId: id,
      thumbUrl,
      regularUrl,
    },
  });

  const result = yield promise;
  if (result) {
    log.info('[photoFavAdd] data received: ', result);
    yield put(photoFavUpdateId(id, result.photoId));
  }
}

export function* watchPhotoFavAdd() {
  log.info('watchPhotoFavAdd starting');
  yield takeLatest(PHOTO_FAV_ADD, photoFavAdd);
}
