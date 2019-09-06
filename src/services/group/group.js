import request from '../../utils/request';

const WEB_APP = 'http://localhost:8502/api';

/**
 * @description query all data
 * @param {null} null transfer null to backward
 * @return {number} return all object from backend
*/
export function queryList () {
  return request(WEB_APP + '/group/', {
    method: 'GET',
  });
}

/**
 * @description delete one
 * @param {string} id transfer id to backward
 * @return {number} return 1 if success
*/
export function deleteOne (id) {
  return request(WEB_APP + '/group/delete/' + id, {
    method: 'GET',
  });
}

/**
 * @description add one object
 * @param {object} data transfer one object to backward
 * @return {Object} return one object from http
*/
export function addOne (data) {
  return request(WEB_APP + '/group/add', {
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
  return request(WEB_APP + '/group/update', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}
