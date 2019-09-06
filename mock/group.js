'use strict';

const qs = require('qs');
const mockjs = require('mockjs')

let tableListData = {};
if (!global.tableListData) {
  const data = mockjs.mock({
    'data|100': [{
      'id': '@id',
      'name': '@name',
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
  ['GET mock/group'] (request, response) {
    const page = qs.parse(request.query);
    const pageSize = page.pageSize || 10;
    const currentPage = page.page || 1;

    let data;
    let newData = tableListData.data.concat();
    let newPage;

    if (page.field) {
      const d = newData.filter((item) => {
        return item[page.field].indexOf(page.keyword) > -1;
      });
      data = d.slice((currentPage - 1) * pageSize, currentPage * pageSize);
      newPage = {
        current: currentPage * 1,
        total: d.length,
      };
    } else {
      data = d.slice((currentPage-1) * pageSize, currentPage * pageSize);
      tableListData.page.current = currentPage * 1;
      newPage = {
        current: tableListData.page.current,
        total: tableListData.page.total,
      }
    }
    setTimeout(() => {
      response.json({
        success: true,
        data,
        page: '123',
      });
    }, 200);
  }
}
