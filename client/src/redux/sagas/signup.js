import { takeLatest, put } from 'redux-saga/effects';
import { Auth } from "aws-amplify";

import log from '../../common/libs/logger';
import { SIGNUP_IN_PROGRESS } from '../actions/types';
import { signedUpSet } from '../actions';
import history from '../../common/libs/history';

export function* signup({ payload: { email, password } }) {
  log.info('signup fired...', email, password);

  try {
    const result = yield Auth.signUp({
      username: email,
      password,
    });

    if(result) {
      yield put(signedUpSet());
    }
  } catch(e) {
    log.error('Exception occurred:', e);
  }
}

export function* watchSignup() {
  log.info('watchSignup starting');
  yield takeLatest(SIGNUP_IN_PROGRESS, signup);
}
