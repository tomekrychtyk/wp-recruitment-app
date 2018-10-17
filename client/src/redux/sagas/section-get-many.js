import { takeLatest, put } from 'redux-saga/effects';

import api from '../../common/libs/api';
import { SECTION_GET_MANY } from '../actions/types';
import { sectionSetMany } from '../actions';
import log from '../../common/libs/logger';

export function* sectionGetMany() {
  log.info('sectionGetMany fired...');

  const promise = api.collections.listCollections()
    .then(data => data.json())
    .then(data => data)
    .catch(error => {
      log.error('Exception occurred');
    });

  const result = yield promise;
  result.pop();
  yield put(sectionSetMany(result));
}

export function* watchSectionGetMany() {
  log.info('watchSectionGetMany starting');
  yield takeLatest(SECTION_GET_MANY, sectionGetMany);
}
