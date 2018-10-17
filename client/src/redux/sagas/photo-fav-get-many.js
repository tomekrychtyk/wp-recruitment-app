import { takeLatest, put } from 'redux-saga/effects';
import { API } from 'aws-amplify';

import log from '../../common/libs/logger';
import { PHOTO_FAV_GET_MANY } from '../actions/types';
import { photoFavSetMany } from '../actions';

export function* photoFavGetMany() {
  log.info('photoFavsGetMany fired...');

  const promise = API.get('unsplashed', '/photo/get-many');
  const result = yield promise;

  if (result) {
    log.info('[photoFavsGetMany] data received: ', result);
    yield put(photoFavSetMany(result));
  }
}

export function* watchPhotoFavGetMany() {
  log.info('watchphotoFavsGetMany starting');
  yield takeLatest(PHOTO_FAV_GET_MANY, photoFavGetMany);
}
