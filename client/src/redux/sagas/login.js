import { takeLatest, put } from 'redux-saga/effects';
import { Auth } from 'aws-amplify';

import log from '../../common/libs/logger';
import { LOGIN_IN_PROGRESS } from '../actions/types';
import { loggedInSet, photoFavGetMany } from '../actions';

export function* login({ payload }) {
  log.info('login fired...', payload);

  try {
    const result = yield Auth.signIn(payload.email, payload.password);

    if (result) {
      yield put(loggedInSet(true));
      yield put(photoFavGetMany());
    }
  } catch (e) {
    yield log.error('Exception occurred: ', e);
  }
}

export function* watchLogin() {
  log.info('watchLogin starting');
  yield takeLatest(LOGIN_IN_PROGRESS, login);
}
