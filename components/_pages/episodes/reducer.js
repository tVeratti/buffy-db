import findIndex from 'lodash/findIndex';

export default (state = [], action) => {
  const nextState = [...state];

  switch (action.type) {
    case 'RECEIVE_EPISODE': {
      const index = findIndex(state, e => e._id === action.episode._id);
      nextState[index] = action.episode;
      break;
    }
    case 'RECEIVE_EPISODES':
      return action.episodes;
  }

  return nextState;
};
