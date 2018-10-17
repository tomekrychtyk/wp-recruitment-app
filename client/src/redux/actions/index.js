import * as types from './types';

export const randomPhotoGet = () => ({
  type: types.RANDOM_PHOTO_GET,
});

export const randomPhotoSet = photo => ({
  type: types.RANDOM_PHOTO_SET,
  payload: { photo },
});

export const sectionGetMany = () => ({
  type: types.SECTION_GET_MANY,
});

export const sectionSetMany = sections => ({
  type: types.SECTION_SET_MANY,
  payload: { sections },
});

export const sectionGet = id => ({
  type: types.SECTION_GET,
  payload: { id },
});

export const sectionSet = section => ({
  type: types.SECTION_SET,
  payload: { section },
});

export const login = (email, password) => ({
  type: types.LOGIN_IN_PROGRESS,
  payload: { email, password },
});

export const loggedInSet = loggedIn => ({
  type: types.LOGIN_SUCCESS,
  payload: { loggedIn },
});

export const signup = (email, password) => ({
  type: types.SIGNUP_IN_PROGRESS,
  payload: { email, password },
});

export const signedUpSet = () => ({
  type: types.SIGNEDUP_SET,
});

export const signUpConfirm = (email, code, password) => ({
  type: types.SIGNUP_CONFIRM_IN_PROGRESS,
  payload: { email, code, password },
});

export const signUpConfirmed = () => ({
  type: types.SIGNUP_CONFIRMED,
});

export const photoGetMany = ({
  sectionId,
  page,
  limit,
  orderBy,
  reload = false,
}) => ({
  type: types.PHOTO_GET_MANY,
  payload: {
    sectionId, page, limit, orderBy, reload,
  },
});

export const photoSetMany = photos => ({
  type: types.PHOTO_SET_MANY,
  payload: { photos },
});

export const photoListReload = photos => ({
  type: types.PHOTO_LIST_RELOAD,
  payload: { photos },
});

export const photoListSortLocal = orderBy => ({
  type: types.PHOTO_LIST_SORT_LOCAL,
  payload: { orderBy },
});

export const sectionActiveClear = () => ({
  type: types.SECTION_ACTIVE_CLEAR,
});

export const photoGet = id => ({
  type: types.PHOTO_GET,
  payload: { id },
});

export const photoSet = photo => ({
  type: types.PHOTO_SET,
  payload: { photo },
});

export const photoClear = () => ({
  type: types.PHOTO_CLEAR,
});

export const photoFavGetMany = () => ({
  type: types.PHOTO_FAV_GET_MANY,
});

export const photoFavSetMany = photos => ({
  type: types.PHOTO_FAV_SET_MANY,
  payload: { photos },
});

export const photoFavAdd = ({
  id,
  thumbUrl,
  regularUrl,
}) => ({
  type: types.PHOTO_FAV_ADD,
  payload: {
    id,
    thumbUrl,
    regularUrl,
  },
});

export const photoFavUpdateId = (unsplashId, photoId) => ({
  type: types.PHOTO_FAV_UPDATE_ID,
  payload: {
    unsplashId,
    photoId,
  },
});

export const photoFavDelete = photoId => ({
  type: types.PHOTO_FAV_DELETE,
  payload: {
    photoId,   photoId,
  },
});
