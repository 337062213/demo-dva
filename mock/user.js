'use strict';

const qs = require('qs');
// 导入mock.js的模块
const mockjs = require('mockjs');
// 导入mock.js的随机数
const Random = mockjs.Random;
// 数据持久化保存在global的全局变量中
let tableListData = {};

if (!global.tableListData) {
  const data = mockjs.mock({
    'data|10': [{
      'fid|+10': 10000,
      'gid|+1': 1,
      'age': () => (Random.integer(18, 24)),
      'sex': () => (Random.character('upper')),
      'name': () => (Random.cname()),
      'address': () => (Random.cname()),
      'mobile': /1(3[0-9]|4[57]|5[0-35-9]|7[01678]|8[0-9])\d{8}/,
      'avatar': () => (Random.image('125x125')),
      'status|1-2': 1,
      'email': () => (Random.email('visiondk.com')),
      'isadmin|0-1': 1,
      'created_at': () => (Random.datetime('yyyy-MM-dd HH:mm:ss')),
      'updated_at': () => (Random.datetime('yyyy-MM-dd HH:mm:ss')),
    }],
    page: {
      total: 100,
      current: 1,
    },
  });
  tableListData = data;
  global.tableListData = tableListData;
} else {
  tableListData = global.tableListData;
}

module.exports = {
  // post请求  /api/users/ 是拦截的地址 方法内部接受 request response对象
  'GET /mock/user' (req, res) {
    const page = qs.parse(req.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;
    let data;
    let newPage;
    let newData = tableListData.data.concat();

    // 数据开始模拟
    if (page.field) {
      const d = newData.filter((item) => (item[page.filed].indexOf(page.keyword) > -1));
      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      newPage = {
        current: currentPage * 1,
        total: d.length,
      };
    } else {
      data = tableListData.data.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      tableListData.page.current = currentPage * 1;
      newPage = {
        current: tableListData.page.current,
        total: tableListData.page.total,
      };
    }
    setTimeout(() => {
      res.json({
        // 将请求json格式返回
        success: true,
        data,
        page: '123',
      });
    }, 200);
  },
};
