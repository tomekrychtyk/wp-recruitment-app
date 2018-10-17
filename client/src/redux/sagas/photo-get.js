import { takeLatest, put } from 'redux-saga/effects';

import log from '../../common/libs/logger';
import { PHOTO_GET } from '../actions/types';
import { photoSet } from '../actions';
import api from '../../common/libs/api';

export function* photoGet({ payload: { id } }) {
  log.info('photoGet fired...', id);

  const promise = yield api.photos.getPhoto(id)
    .then(data => data.json())
    .then(data => data)
    .catch((e) => {
      log.error('Exception occurred', e);
    });

  const result = yield promise;
  if (result) {
    log.info('[photoGet] data received: ', result);
    yield put(photoSet(result));
  } else {
    // TODO: No data received, yield "404"
  }
}

export function* watchPhotoGet() {
  log.info('watchphotoGet starting');
  yield takeLatest(PHOTO_GET, photoGet);
}
