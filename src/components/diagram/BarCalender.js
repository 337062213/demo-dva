import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
import styles from '../../index.css';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/bar';
import 'echarts/lib/chart/line';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';
import 'echarts/lib/component/legend';
import 'echarts/lib/component/toolbox';
import 'echarts/lib/component/markPoint';
import 'echarts/lib/component/markLine';
// 引入雷达图
// import  'echarts/lib/chart/radar';
// 引入提示框和标题组件
// import 'echarts/lib/component/tooltip';
// 引入title
// import 'echarts/lib/component/title';
// 引入图例
// import 'echarts/lib/component/legend';
export default class BarCalender extends Component {
  constructor (props) {
    super(props);
    this.state = {
    };
  }

  /**
   * resolve one object to json
   * @param  {string} url       The url we want to request
   * @param  {string} fileName       The name of file we want to export excel
   * @param  {string} version       The version we want to export excel
   * @return {object} fileName         An object containing either "data" or "err"
  */
  getVirtulData () {
    var date = +echarts.number.parseDate('2017-02-01');
    var end = +echarts.number.parseDate('2017-03-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
      data.push([
        echarts.format.formatTime('yyyy-MM-dd', time),
        Math.floor(Math.random() * 10000),
      ]);
    }
    return data;
  }

  /**
   * resolve one object to json
   * @param  {string} scatterData       The url we want to request
   * @param  {string} chart       The name of file we want to export excel
   * @return {object} fileName         An object containing either "data" or "err"
  */
  getPieSeries (scatterData, chart) {
    const pieRadius = 30;
    return echarts.util.map(scatterData, function (item, index) {
      var center = chart.convertToPixel('calendar', item);
      return {
        id: index + 'pie',
        type: 'pie',
        center: center,
        label: {
          normal: {
            formatter: '{c}',
            position: 'inside',
          },
        },
        radius: pieRadius,
        data: [
          {name: '工作', value: Math.round(Math.random() * 24)},
          {name: '娱乐', value: Math.round(Math.random() * 24)},
          {name: '睡觉', value: Math.round(Math.random() * 24)},
        ],
      };
    });
  }

  /**
   * resolve one object to json
   * @param  {string} scatterData       The url we want to request
   * @param  {string} chart       The name of file we want to export excel
   * @return {object} fileName         An object containing either "data" or "err"
  */
  getPieSeriesUpdate (scatterData, chart) {
    return echarts.util.map(scatterData, function (item, index) {
      var center = chart.convertToPixel('calendar', item);
      return {
        id: index + 'pie',
        center: center,
      };
    });
  }

  // let scatterData = getVirtulData();
  /**
   * @description 配置图表
   * @returns {void} null
   * @memberof EchartsRadar
   */
  getOption () {
    const cellSize = [80, 80];
    var date = +echarts.number.parseDate('2017-02-01');
    var end = +echarts.number.parseDate('2017-03-01');
    var dayTime = 3600 * 24 * 1000;
    var data = [];
    for (var time = date; time < end; time += dayTime) {
      data.push([
        echarts.format.formatTime('yyyy-MM-dd', time),
        Math.floor(Math.random() * 10000),
      ]);
    }
    return {
      tooltip: {},
      legend: {
        data: ['工作', '娱乐', '睡觉'],
        bottom: 20,
      },
      calendar: {
        top: 'middle',
        left: 'center',
        orient: 'vertical',
        cellSize: cellSize,
        yearLabel: {
          show: false,
          textStyle: {
            fontSize: 30,
          },
        },
        dayLabel: {
          margin: 20,
          firstDay: 1,
          nameMap: ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'],
        },
        monthLabel: {
          show: false,
        },
        range: ['2017-02'],
      },
      series: [{
        id: 'label',
        type: 'scatter',
        coordinateSystem: 'calendar',
        symbolSize: 1,
        label: {
          normal: {
            show: true,
            formatter: function (params) {
              return echarts.format.formatTime('dd', params.value[0]);
            },
            offset: [-cellSize[0] / 2 + 10, -cellSize[1] / 2 + 10],
            textStyle: {
              color: '#000',
              fontSize: 14,
            },
          },
        },
        data: data,
      }],
    };
  }

  /**
   * @description 雷达图选中区域点击事件和外部显示标签点击事件
   * @param {any} param a
   * @param {any} echarts a
   * @memberof EchartsRadar
   * @returns {void} null
   */
  onChartClick (param, echarts) {
    console.log(param);
  }

  /**
  * @description 点击legend事件
  * @param {any} param a
  * @param {any} echarts a
  * @memberof EchartsRadar
  * @returns {void} null
  */
  onChartLegendselectchanged (param, echarts) {
    console.log(param);
  }
  componentWillReceiveProps (nextProps) {
    console.log();
  }
  componentWillMount () {
    console.log();
  }
  componentDidMount () {
    console.log();
  }
  render () {
    let onEvents = {
      'click': this.onChartClick.bind(this),
      'legendselectchanged': this.onChartLegendselectchanged.bind(this),
    };
    return (
      <div className={styles.echartsRadar}>
        <ReactEcharts
          option={this.getOption()}
          notMerge={true}
          lazyUpdate={true}
          onEvents={onEvents}
          style={{width: '100%', height: '100%'}}
        />
      </div>
    );
  }
}
