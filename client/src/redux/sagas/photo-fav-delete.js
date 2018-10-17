import { takeLatest } from 'redux-saga/effects';
import { API } from 'aws-amplify';

import log from '../../common/libs/logger';
import { PHOTO_FAV_DELETE } from '../actions/types';

export function* photoFavDelete({ payload }) {
  log.info('photoFavDelete fired...', payload);

  const promise = API.del('unsplashed', `/photo/${payload.photoId}`);
  const result = yield promise;

  log.info(result);
}

export function* watchPhotoFavDelete() {
  log.info('watchPhotoFavDelete starting');
  yield takeLatest(PHOTO_FAV_DELETE, photoFavDelete);
}
