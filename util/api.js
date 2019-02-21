import fetch from 'node-fetch';

const baseUrl = (url, req) => {
  const baseUrl = req ? `${req.protocol}://${req.get('Host')}` : '';
  return `${baseUrl}${url}`;
};

export const get = (url, req) => {
  return fetch(baseUrl(url, req));
};

export const post = ({ url, body }, req) => {
  return fetch(baseUrl(url, req), {
    method: 'post',
    body: JSON.stringify(body),
    headers: { 'Content-Type': 'application/json' }
  });
};
