import fetch from 'dva/fetch';

/**
 * resolve one object to json
 * @param  {string} response       The response we want to resolve
 * @return {object}           An object containing either "data" or "err"
*/
function parseJSON (response) {
  return response.json();
}

/**
 * resolve one object to json
 * @param  {string} response       The response we want to resolve
 * @return {object}           An object containing either "data" or "err"
*/
function checkStatus (response) {
  const startSuccess = 200;
  const endSuccess = 300;
  if (response.status >= startSuccess && response.status < endSuccess) {
    return response;
  }
  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default function request (url, options) {
  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then((data) => ({ data }));
}
