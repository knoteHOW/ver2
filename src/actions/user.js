import { delay, put, takeEvery, takeLatest, all, fork, call } from 'redux-saga/effects';
import axios from 'axios';

import { USER_INFORM_SUCCESS, USER_INFORM_REQUEST, USER_INFORM_FAILURE } from '../reducers/user';
import { USER_CREATOR_INFORM_SUCCESS, USER_CREATOR_INFORM_REQUEST, USER_CREATOR_INFORM_FAILURE } from '../reducers/user';
import { USER_DEL_INFORM_SUCCESS, USER_DEL_INFORM_REQUEST, USER_DEL_INFORM_FAILURE } from '../reducers/user';
import { USER_LOGIN_SUCCESS, USER_LOGIN_REQUEST, USER_LOGIN_FAILURE } from '../reducers/user';


function getCreatorInformAPI() {
  return axios.get('/creators/me');
}

function getUserInformAPI() {
  return axios.get('/users/me');
}

function loginAPI(loginData) {
  return axios.post('/users/login', loginData);
}

function* getCreatorInform(action) {
  try {
    const result = yield call(getCreatorInformAPI);
    yield put({
      type: USER_CREATOR_INFORM_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: USER_CREATOR_INFORM_FAILURE,
    })
  }
}

function* getUserInform(action) {
  try {
    const result = yield call(getUserInformAPI);
    yield put({
      type: USER_INFORM_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.error(error);
    yield put({
      type: USER_INFORM_FAILURE,
    })
  }
}

function* delInform() {
  yield put({
    type: USER_DEL_INFORM_SUCCESS,
    data: '',
  })
}

function* login(action) {
  try {
    const result = yield call(loginAPI, action.data);
    yield put({
      type: USER_LOGIN_SUCCESS,
      data: result.data,
    })
  } catch (error) {
    console.error(error, 'err');
    yield put({
      type: USER_LOGIN_FAILURE,
    })
  }
}

function* watchGetCreatorInform() {
  yield takeEvery(USER_CREATOR_INFORM_REQUEST, getCreatorInform);
}

function* watchGetUserInform() {
  yield takeEvery(USER_INFORM_REQUEST, getUserInform);
}

function* watchDelInform() {
  yield takeEvery(USER_DEL_INFORM_REQUEST, delInform);
}

function* watchLogin() {
  yield takeEvery(USER_LOGIN_REQUEST, login);
}

export default function* userSage() {
  yield all([
    fork(watchGetCreatorInform),
    fork(watchGetUserInform),
    fork(watchDelInform),
    fork(watchLogin),
  ])
}