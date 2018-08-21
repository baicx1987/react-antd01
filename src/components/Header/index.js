import React, { Component } from "react";
import { Row, Col } from "antd";
import Utils from "../../utils/utils";
import Axios from "../../axios";
import "./index.less";

export default class Header extends Component {
    componentWillMount() {
        this.setState({
            username: 'bcx'
        });
        setInterval(() => {
            let sysTime = Utils.formateDate(new Date().getTime());
            this.setState({
                sysTime
            });
        }, 1000);
        this.getWatherApiData();
    }
    getWatherApiData() {
        let city = '北京';
        Axios.jsonp({
            url: 'http://api.map.baidu.com/telematics/v3/weather?location=' + encodeURIComponent(city) + '&output=json&ak=0wOllaGxYWfuct8XGxmS7hcr6PGpugbK'
        }).then((res) => {
            //debugger;
            if (res.status === 'success') {
                let data = res.results[0].weather_data[0];
                this.setState({
                    dayPictureUrl: data.dayPictureUrl,
                    weather: data.weather
                });
            }
        });
    }
    render() {
        const menuType = this.props.menuType;
        return (
            <div className="header">
                <Row className="header-top">
                    {
                        menuType?
                            <Col span="6" className="logo">
                                <img src="/assets/logo-ant.svg" alt="" />
                                <span>IMook 通用管理系统</span>
                            </Col>:''
                    }
                    <Col span={menuType ? 18:24}>
                        <span>欢迎，{this.state.username}</span>
                        <a href="#">退出</a>
                    </Col>
                </Row>
                {
                    menuType ? '' :
                        <Row className="breadcrumb">
                            <Col span="4" className="breadcrumb-title">
                                首页
                            </Col>
                            <Col span="20" className="weather">
                                <span className="date">{this.state.sysTime}</span>
                                <span className="weather-img">
                                    <img src={this.state.dayPictureUrl} alt="" />
                                </span>
                                <span className="weather-detail">
                                    {this.state.weather}
                                </span>
                            </Col>
                        </Row>
                }

            </div>
        );
    }
}