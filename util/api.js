import fetch from 'node-fetch';

const baseUrl = (url, req) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  return `${baseUrl}${url}`;
};

export const get = (url, req, user) => {
  return fetch(baseUrl(url, req), {
    headers: {
      cookie: `user=${user}`
    }
  });
};

export const post = ({ url, body, user }, req) => {
  return fetch(baseUrl(url, req), {
    method: 'post',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      cookie: `user=${user}`
    }
  });
};
