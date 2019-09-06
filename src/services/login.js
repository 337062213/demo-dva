import request from '../utils/request';

const WEB_APP = 'http://localhost:8502/api';

/**
 * @description query all data
 * @param {string} data transfer null to backward
 * @return {number} return all object from backend
*/
export function login (data) {
  return request(WEB_APP + '/login', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @description logout
 * @param {null} null transfer null to backward
 * @return {number} return all object from backend
*/
export function logout () {
  return request(WEB_APP + '/logout');
}
