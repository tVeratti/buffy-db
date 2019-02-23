import { post } from '../../../util/api';

export const rate = (_id, rating, dispatch) => {
  post({
    url: '/api/episodes/rate',
    body: { _id, rating }
  })
    .then(res => res.json())
    .then(res => {
      dispatch({ type: 'RECEIVE_EPISODE', episode: res[0] });
    });
};
