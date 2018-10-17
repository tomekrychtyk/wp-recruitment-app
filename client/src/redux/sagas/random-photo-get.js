import 'regenerator-runtime/runtime';
import { takeLatest, put } from 'redux-saga/effects';

import api from '../../common/libs/api';
import { RANDOM_PHOTO_GET } from '../actions/types';
import { randomPhotoSet } from '../actions';

import log from '../../common/libs/logger';

export function* randomPhotoGet() {
  log.info('randomPhotoGet fired...');
  
  const promise = api.photos.getRandomPhoto({ width: 1900 })
    .then(data => data.json())
    .then(data => data)
    .catch(error => {
      log.error('Exception occurred: ', error);
    });

  const result = yield promise;
  yield put(randomPhotoSet(result.urls.custom));
}

export function* watchRandomPhotoGet() {
  log.info('watchRandomPhotoGet starting');
  yield takeLatest(RANDOM_PHOTO_GET, randomPhotoGet);
}
