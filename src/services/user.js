import request from '../utils/request';

const WEB_APP = 'http://localhost:8502/api';

/**
 * @description query all data
 * @param {string} name transfer null to backward
 * @param {string} gid transfer null to backward
 * @return {number} return all object from backend
*/
export function queryList (name, gid) {
  return request(WEB_APP + '/user/findByParams?name=' + name + '&gid=' + gid, {
    method: 'GET',
  });
}

/**
 * @description delete one
 * @param {string} id transfer id to backward
 * @return {number} return 1 if success
*/
export function deleteOne (id) {
  return request(WEB_APP + '/user/delete/' + id, {
    method: 'GET',
  });
}

/**
 * @description add one object
 * @param {object} data transfer one object to backward
 * @return {Object} return one object from http
*/
export function addOne (data) {
  return request(WEB_APP + '/user/add', {
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
  return request(WEB_APP + '/user/update', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}
