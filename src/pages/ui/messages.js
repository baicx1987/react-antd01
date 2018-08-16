import React, { Component } from "react";
import { Card, Button, message} from "antd";
import "./ui.less";

export default class Messages extends Component {
    state = {
    }
    handleOpenMessage = (type) =>{
        message[type]('提醒吃药时间到了');
    }
    render() {
        return (
            <div>
                <Card title="全局提示框" className="card-warp">
                    <Button onClick={() => this.handleOpenMessage('success')} type="primary">Success</Button>
                    <Button onClick={() => this.handleOpenMessage('info')}>Info</Button>
                    <Button onClick={() => this.handleOpenMessage('warning')} type="dashed">Warning</Button>
                    <Button onClick={() => this.handleOpenMessage('error')} type="danger">Error</Button>
                    <Button onClick={() => this.handleOpenMessage('loading')} type="danger">Loading</Button>
                </Card>
           </div>
        );
    }
}