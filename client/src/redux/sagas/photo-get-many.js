import { takeLatest, put } from 'redux-saga/effects';

import log from '../../common/libs/logger';
import { PHOTO_GET_MANY } from '../actions/types';
import { photoSetMany, photoListReload } from '../actions';
import api from '../../common/libs/api';

export function* photoGetMany({ payload }) {
  log.info('photoGetMany fired...', payload);

  const {
    sectionId: id, page, limit, orderBy, reload,
  } = payload;
  const promise = yield api.collections.getCollectionPhotos(id, page, limit, orderBy)
    .then(data => data.json())
    .then(data => data)
    .catch((e) => {
      log.error('Exception occurred: ', e);
    });

  const result = yield promise;
  if (result) {
    // Data received
    log.info('[photoGetMany] Data received: ', result);
    if (reload) {
      yield put(photoListReload(result));
    } else {
      yield put(photoSetMany(result));
    }
  } else {
    // TODO: No data received, yield "404"
  }
}

export function* watchPhotoGetMany() {
  log.info('watchPhotoGetMany starting');
  yield takeLatest(PHOTO_GET_MANY, photoGetMany);
}
