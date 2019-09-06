import request from '../../utils/request';

const WEB_APP = 'http://localhost:8502/api';

/**
 * @description query all data
 * @param {name} name gid transfer null to backward
 * @param {gid} gid gid transfer null to backward
 * @return {gid} gid all object from backend
*/
export function queryList (name, gid) {
  return request(WEB_APP + '/user/findByParams?name=' + name + '&gid=' + gid, {
    method: 'GET',
  });
}

/**
 * @description delete one
 * @param {string} fid transfer id to backward
 * @return {number} return 1 if success
*/
export function getOne (fid) {
  return request(WEB_APP + '/user/' + fid, {
    method: 'GET',
  });
}

/**
 * @description delete one
 * @param {string} id transfer id to backward
 * @return {number} return 1 if success
*/
export function deleteOne (id) {
  return request(WEB_APP + '/user/deleteUser/' + id, {
    method: 'GET',
  });
}

/**
 * @description add one object
 * @param {object} data transfer one object to backward
 * @return {Object} return one object from http
*/
export function addOne (data) {
  return request(WEB_APP + '/user/addUser', {
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
  return request(WEB_APP + '/user/updateUser', {
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',
    body: JSON.stringify(data),
  });
}
