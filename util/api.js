import fetch from 'node-fetch';

export const get = (url, req) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  return fetch(`${baseUrl}${url}`);
};
