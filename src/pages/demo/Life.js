import React,{ Component } from "react";
import {Button} from 'antd';
import Child from "./Child";
import "./index.less";
// import "antd/dist/antd.css"
// import  "antd/dist/antd.css";

export default class Life extends Component {
    constructor(){
        super();
        this.state ={
            count: 0
        };
    }

    handleAdd(){
        this.setState({
            count: this.state.count + 1
        });
    }
    handleClick = () => {
        this.setState({
            count: this.state.count + 1
        })
    }

    render(){
        return <div className="content">
            <p>React 生命周期介绍</p>
            <Button type="primary" onClick={this.handleClick}>点击一下</Button>
            <p>{this.state.count}</p>
            <Child name={this.state.count}></Child>
        </div>;
    }
}