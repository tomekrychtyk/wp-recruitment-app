import { takeLatest, put } from 'redux-saga/effects';

import log from '../../common/libs/logger';
import { SECTION_GET } from '../actions/types';
import { sectionSet } from '../actions';
import api from '../../common/libs/api';

export function* sectionGet({ payload: { id } }) {
  log.info('sectionGet fired...', id);

  const promise = api.collections.getCollection(id)
    .then(data => data.json())
    .then(data => data)
    .catch(error => {
      log.error('Exception occurred', error);
    });

  const result = yield promise;

  try {
    if (result) {
      // Data received
      log.info('[sectionGet] Data received: ', result);
      if(result.errors) {
        // TODO: Handle the exception
      } else {
        yield put(sectionSet(result));
      }
    } else {
      // No data received
    }
  } catch (e) {
    log.info('Exception occured: ', e);
  }
}

export function* watchSectionGet() {
  log.info('watchSectionGet starting');
  yield takeLatest(SECTION_GET, sectionGet);
}
