import Axios from 'axios';

/**
 * resolve one object to json
 * @param  {string} url       The url we want to request
 * @param  {string} fileName       The name of file we want to export excel
 * @param  {string} version       The version we want to export excel
 * @return {object} fileName         An object containing either "data" or "err"
*/
export function download (url, fileName, version) {
  let urlr;
  if (fileName === undefined) {
    fileName = '';
  } else if (fileName === '') {
    fileName = '用户汇总表';
  }
  switch (version) {
    case '2003' : urlr = url + '/2003' ; break;
    case '2007' : urlr = url + '/2007' ; break;
    default : urlr = url;
  }
  let obj = {
    method: 'get',
    url: urlr,
    timeout: 5000,
    responseType: 'blob',
    headers: {
      'Authorization': '',
    },
  };
  return Axios.create().request(obj)
    .then((response) => {
      if (response.status === 200) {
        let blob = new Blob([response.data], {type: response.data.type});
        let event = document.createEvent('MouseEvents');
        let element = document.createElement('a');
        element.href = window.URL.createObjectURL(blob);
        element.download = fileName;
        event.initEvent('click', true, true);
        element.dispatchEvent(event);
      } else {
        window.alert('下载失败');
      }
    });
}

/**
 * resolve one object to json
 * @param  {string} url       The url we want to request
 * @param  {string} fileName       The name of file we want to export excel
 * @param  {string} version       The version we want to export excel
 * @return {object} fileName         An object containing either "data" or "err"
*/
export function downloadPDF (url, fileName) {
  if (fileName === undefined) {
    fileName = '';
  } else if (fileName === '') {
    fileName = '用户汇总表';
  }
  let obj = {
    method: 'get',
    url: url,
    timeout: 5000,
    responseType: 'blob',
    headers: {
      'Authorization': '',
    },
  };
  return Axios.create().request(obj)
    .then((response) => {
      if (response.status === 200) {
        let blob = new Blob([response.data], {type: response.data.type});
        let event = document.createEvent('MouseEvents');
        let element = document.createElement('a');
        element.href = window.URL.createObjectURL(blob);
        element.download = fileName;
        event.initEvent('click', true, true);
        element.dispatchEvent(event);
      } else {
        window.alert('下载失败');
      }
    });
}
