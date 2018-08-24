import React, { Component } from "react";
import { Card } from "antd";
import Echarts from "echarts/lib/echarts";
import ReactEcharts from "echarts-for-react/lib/core";
import "echarts/lib/chart/pie";
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
import "echarts/lib/component/legend";
import "echarts/lib/component/markPoint";
import echartsTheme from "../themeLight";


export default class Pie extends Component {

    componentWillMount() {
        Echarts.registerTheme('star', echartsTheme);
    }

    getOption = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x:'center'
            },
            legend: {
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            tooltip: {
                trigger: 'item',
                formatter:'{a}<br/>{b}:{c}({d}%) '
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    data: [
                        {
                            value:1100,
                            name:'周一'
                        },
                        {
                            value:1100,
                            name:'周二'
                        },
                        {
                            value:1100,
                            name:'周三'
                        },
                        {
                            value:1100,
                            name:'周四'
                        },
                        {
                            value:1100,
                            name:'周五'
                        },
                        {
                            value:1100,
                            name:'周六'
                        },
                        {
                            value:1100,
                            name:'周日'
                        },
                    ]  
                }
            ]
        }
        return option;
    }
    getOption2 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x:'center'
            },
            legend: {
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            tooltip: {
                trigger: 'item',
                formatter:'{a}<br/>{b}:{c}({d}%) '
            },
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    radius:['50%','70%'],
                    data: [
                        {
                            value:1100,
                            name:'周一'
                        },
                        {
                            value:1100,
                            name:'周二'
                        },
                        {
                            value:1100,
                            name:'周三'
                        },
                        {
                            value:1100,
                            name:'周四'
                        },
                        {
                            value:1100,
                            name:'周五'
                        },
                        {
                            value:1100,
                            name:'周六'
                        },
                        {
                            value:1100,
                            name:'周日'
                        },
                    ]  
                }
            ]
        }
        return option;
    }
    getOption3 = () => {
        let option = {
            title: {
                text: '用户骑行订单',
                x:'center'
            },
            legend: {
                orient:'vertical',
                right:10,
                top:20,
                bottom:20,
                data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
            },
            tooltip: {
                trigger: 'item',
                formatter:'{a}<br/>{b}:{c}({d}%) '
            },
            
            series: [
                {
                    name: '订单量',
                    type: 'pie',
                    roseType: 'radius',
                    data: [
                        {
                            value:1200,
                            name:'周一'
                        },
                        {
                            value:1100,
                            name:'周二'
                        },
                        {
                            value:1300,
                            name:'周三'
                        },
                        {
                            value:1900,
                            name:'周四'
                        },
                        {
                            value:1400,
                            name:'周五'
                        },
                        {
                            value:1500,
                            name:'周六'
                        },
                        {
                            value:1700,
                            name:'周日'
                        },
                    ].sort(function (a, b) { return a.value - b.value; }),
                }
            ]
        }
        return option;
    }
    render() {
        return (
            <div>
                <Card title="饼图一">
                    <ReactEcharts
                        echarts={Echarts}
                        theme="star"
                        option={this.getOption()}
                        style={{ height: 500 }}
                    ></ReactEcharts>
                </Card>
                <Card title="饼图二" style={{ marginTop: 10 }}>
                    <ReactEcharts
                        echarts={Echarts}
                        theme="star"
                        option={this.getOption2()}
                        style={{ height: 500 }}
                    ></ReactEcharts>
                </Card>
                <Card title="饼图三" style={{ marginTop: 10 }}>
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