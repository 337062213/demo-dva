import request from '../utils/request';

const WEB_APP = '/mock';

/**
 * @description query all data
 * @param {null} null transfer null to backward
 * @return {number} return all object from backend
*/
export function queryList () {
  return request(WEB_APP + '/list', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'GET',
  });
}

/**
 * @description delete one
 * @param {object} data transfer id to backward
 * @return {number} return 1 if success
*/
export function deleteOne (data) {
  return request(WEB_APP + '/list/delete', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @description add one object
 * @param {object} data transfer one object to backward
 * @return {Object} return one object from http
*/
export function addOne (data) {
  return request(WEB_APP + '/list/add', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}

/**
 * @description update one
 * @param {object} data transfer one object to backward
 * @return {Object} return one object from http
*/
export function updateOne (data) {
  return request(WEB_APP + '/list/update', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}
