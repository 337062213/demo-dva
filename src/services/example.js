import request from '../utils/request';

/**
 * @description query all data
 * @param {null} null transfer null to backward
 * @return {object} return all object from backend
*/
export function query () {
  return request('/api/users');
}
