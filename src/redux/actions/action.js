export const INFO_USER = 'INFO_USER';
export const GET_SCORE = 'GET_SCORE';

export const infoUser = (info) => ({
  type: INFO_USER,
  info,
});

export const getScore = (payload) => ({
  type: GET_SCORE,
  payload,
});
