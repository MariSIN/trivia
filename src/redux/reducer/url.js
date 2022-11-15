import { URL } from '../actions/action';

const INITIAL_STATE = {
  endpoint: '',
};

const url = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case URL:
    return {
      ...state,
      endpoint: action.payload,
    };
  default:
    return state;
  }
};

export default url;
