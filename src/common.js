import React, { Component } from "react";
import { Row} from "antd";
import Header from "./components/Header";
import './style/common.less';


export default class Commone extends Component {
    render() {
        return (
            <div className="container">
                <Row className="simple-page">
                    <Header menuType="second" />
                </Row>
                <Row className="content">
                    {this.props.children}
                </Row>
            </div>
        );
    }
}