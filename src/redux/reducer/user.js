import { INFO_USER } from '../actions/action';

const INITIAL_STATE = {
  email: '',
  name: '',
};

const user = (state = INITIAL_STATE, actions) => {
  switch (actions.type) {
  case INFO_USER:
    return {
      ...state,
      email: actions.info.email,
      name: actions.info.name,
    };
  default:
    return state;
  }
};

export default user;
