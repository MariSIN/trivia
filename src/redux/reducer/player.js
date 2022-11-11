import { INFO_USER, GET_SCORE, GET_ASSERTIONS } from '../actions/action';

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
  case GET_ASSERTIONS:
    return {
      ...state,
      assertions: Number(state.assertions + action.payload),
    };
  default:
    return state;
  }
};

export default player;
