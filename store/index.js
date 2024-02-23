// store/index.js
import { createStore } from 'redux';

// Define initial state
const initialState = {
  videoDuration: null,
};

// Define reducer
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VIDEO_DURATION':
      return {
        ...state,
        videoDuration: action.payload,
      };
    default:
      return state;
  }
};

// Create Redux store
const store = createStore(reducer);

export default store;
