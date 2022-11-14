export const INFO_USER = 'INFO_USER';
export const GET_SCORE = 'GET_SCORE';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';
export const CLEAR_INFO = 'CLEAR_INFO';

export const infoUser = (info) => ({
  type: INFO_USER,
  info,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});

export const assertionsAction = (payload) => ({
  type: GET_ASSERTIONS,
  payload,
});

export const clearInfo = (empty) => ({
  type: CLEAR_INFO,
  empty,
});
