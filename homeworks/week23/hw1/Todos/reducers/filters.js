import { SET_FILTER } from '../actionTypes';

const initialState = {
  filter: 'all',
};

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case SET_FILTER: {
      return {
        filter: action.payload.filter,
      };
    }

    default: {
      return state;
    }
  }
}
