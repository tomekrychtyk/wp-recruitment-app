import { all } from 'redux-saga/effects';

import { watchRandomPhotoGet } from './sagas/random-photo-get';
import { watchSectionGetMany } from './sagas/section-get-many';
import { watchSectionGet } from './sagas/section-get';
import { watchLogin } from './sagas/login';
import { watchSignup } from './sagas/signup';
import { watchSignupConfirm } from './sagas/signup-confirm';
import { watchPhotoGetMany } from './sagas/photo-get-many';
import { watchPhotoGet } from './sagas/photo-get';
import { watchPhotoFavGetMany } from './sagas/photo-fav-get-many';
import { watchPhotoFavAdd } from './sagas/photo-fav-add';
import { watchPhotoFavDelete } from './sagas/photo-fav-delete';

export default function* rootSaga() {
  yield all([
    watchRandomPhotoGet(),
    watchSectionGetMany(),
    watchSectionGet(),
    watchLogin(),
    watchSignup(),
    watchSignupConfirm(),
    watchPhotoGetMany(),
    watchPhotoGet(),
    watchPhotoFavGetMany(),
    watchPhotoFavAdd(),
    watchPhotoFavDelete(),
  ]);
}
