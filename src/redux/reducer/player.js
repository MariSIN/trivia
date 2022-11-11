import { INFO_USER } from '../actions/action';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const player = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case INFO_USER:
    return {
      ...state,
      email: action.info.email,
      name: action.info.name,
    };
  default:
    return state;
  }
};

export default player;
