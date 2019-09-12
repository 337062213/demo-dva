const mockjs = require('mockjs');
const Random = mockjs.Random;
let db = mockjs.mock({
  'data|100': [{
    'id': '@id',
    'name': '@name',
    'age': () => (Random.integer(18, 24)),
    'gid|+1': 1,
    'sex': () => (Random.pick('M' | 'F')),
    'address': () => (
      Random.province() + Random.city() + Random.county()
    ),
    'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
    'avatar': () => (
      Random.image('125x125')
    ),
    'status|1-2': 1,
    'email': () => Random.email('visiondk.com'),
    'isadmin|0-1': 1,
    'createdat': () => (Random.datetime('yyyy-MM-dd HH:mm:ss')),
    'updatedat': () => (Random.datetime('yyyy-MM-dd HH:mm:ss')),
  }],
});

module.exports = {
  ['GET /mock/list'] (req, res) {
    console.log('mock : ');
    console.log(req);
    res.status(200).json(db);
  },

  ['POST /mock/list/add'] (req, res) {
    let user = req.body;
    db.data.push(user);
    res.status(200).json(db);
  },
  ['POST /mock/list/delete'] (req, res) {
    let user = req.body;
    let uid = user.id;
    for (let item in db.data) {
      if (db.data[item].id === uid) {
        db.data.splice(item, 1);
      }
    }
    res.status(200).json(db);
  },
  ['POST /mock/list/update'] (req, res) {
    let user = req.body;
    let uid = user.id;
    for (let item in db.data) {
      if (db.data[item].id === uid) {
        db.data.splice(item, 1, user);
      }
    }
    res.status(200).json(db);
  },
};
