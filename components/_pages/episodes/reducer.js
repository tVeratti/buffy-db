export default (state = [], action) => {
  switch (action.type) {
    case 'RECEIVE_EPISODES':
      return action.episodes;
  }

  return state;
};
