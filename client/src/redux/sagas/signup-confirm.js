import { takeLatest, put } from 'redux-saga/effects';
import { Auth } from "aws-amplify";

import log from '../../common/libs/logger';
import { SIGNUP_CONFIRM_IN_PROGRESS } from '../actions/types';
import { signUpConfirmed, loggedInSet } from '../actions';

export function* signupConfirm({ payload }) {
  log.info('signupConfirm fired...', payload);
  const { email, code, password } = payload;

  try {
    const result = yield Auth.confirmSignUp(email, code);

    if(result === "SUCCESS" && password) {
      yield Auth.signIn(email, password);
      yield put(loggedInSet(true));
    }

    yield put(signUpConfirmed());
  } catch(e) {

  }
}

export function* watchSignupConfirm() {
  log.info('watchSignupConfirm starting');
  yield takeLatest(SIGNUP_CONFIRM_IN_PROGRESS, signupConfirm);
}
