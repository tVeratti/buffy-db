import findIndex from 'lodash/findIndex';

const initialState = {
  episodes: [],
  content: []
};

export default (state = initialState, action) => {
  const nextState = { ...state };

  switch (action.type) {
    case 'RECEIVE_EPISODE': {
      const index = findIndex(
        state.episodes,
        e => e._id === action.episode._id
      );
      nextState.episodes = [...state.episodes];
      nextState.episodes[index] = action.episode;
      break;
    }
  }

  return nextState;
};
