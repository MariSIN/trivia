import { INFO_USER, GET_SCORE } from '../actions/action';

const INITIAL_STATE = {
  email: '',
  name: '',
  assertions: 0,
  score: 0,
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INFO_USER:
    return {
      ...state,
      email: action.info.email,
      name: action.info.name,
    };
  case GET_SCORE:
    return {
      ...state,
      score: action.payload,
    };
  default:
    return state;
  }
};

export default player;
