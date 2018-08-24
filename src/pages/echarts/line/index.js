import React, { Component } from "react";
import { Card } from "antd";
import Echarts from "echarts/lib/echarts";
import ReactEcharts from "echarts-for-react/lib/core";
import "echarts/lib/chart/line";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import echartsTheme from "../echartTheme";


export default class Line extends Component {

    componentWillMount() {
        Echarts.registerTheme('star', echartsTheme);
    }
    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [1000, 2000, 1300, 1300, 4600, 2200, 1540]
                }
            ]
        }
        return option;
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            legend: {
                data: ['ofo', '膜拜', '小蓝']
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: 'ofo',
                    type: 'line',
                    data: [1100, 2200, 1800, 1100, 4800, 2800, 1840]
                },
                {
                    name: '膜拜',
                    type: 'line',
                    data: [1300, 2500, 1600, 1900, 4200, 2600, 1340]
                }, {
                    name: '小蓝',
                    type: 'line',
                    data: [1000, 2000, 1300, 1300, 4600, 2200, 1540]
                }
            ]
        }
        return option;
    }
    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单'
            },
            tooltip: {
                trigger: 'axis'
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    name: '订单量',
                    type: 'line',
                    data: [1000, 2000, 1300, 1300, 4600, 2200, 1540],
                    areaStyle: {}
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <div>
                <Card title="折现图表一">
                    <ReactEcharts
                        echarts={Echarts}
                        theme="star"
                        option={this.getOption()}
                        style={{ height: 500 }}
                    ></ReactEcharts>
                </Card>
                <Card title="折现图表二" style={{ marginTop: 10 }}>
                    <ReactEcharts
                        echarts={Echarts}
                        theme="star"
                        option={this.getOption2()}
                        style={{ height: 500 }}
                    ></ReactEcharts>
                </Card>
                <Card title="折现图表三" style={{ marginTop: 10 }}>
                    <ReactEcharts
                        echarts={Echarts}
                        theme="star"
                        option={this.getOption3()}
                        style={{ height: 500 }}
                    ></ReactEcharts>
                </Card>
            </div>
        );
    }
}