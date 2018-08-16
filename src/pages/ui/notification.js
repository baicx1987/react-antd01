import React, { Component } from "react";
import { Card, Button, notification} from "antd";
import "./ui.less";

export default class Notification extends Component {
    state = {
    }
    handleOpenNotice = (type, placement) =>{
        // if (placement){
        //     notification.config({
        //         placement
        //     });
        // }
        notification[type]({
            message: '标题',
            description: '提醒吃药时间到了',
            placement
        });
    }
    render() {
        return (
            <div>
                <Card title="通知提醒框" className="card-warp">
                    <Button onClick={() => this.handleOpenNotice('success')} type="primary">Success</Button>
                    <Button onClick={() => this.handleOpenNotice('info')}>Info</Button>
                    <Button onClick={() => this.handleOpenNotice('warning')} type="dashed">Warning</Button>
                    <Button onClick={() => this.handleOpenNotice('error')} type="danger">Error</Button>
                </Card>
                <Card title="方向提醒框" className="card-warp">
                    <Button onClick={() => this.handleOpenNotice('success','topRight')} type="primary">右上</Button>
                    <Button onClick={() => this.handleOpenNotice('success','bottomRight')}>右下</Button>
                    <Button onClick={() => this.handleOpenNotice('success','topLeft')} type="dashed">左上</Button>
                    <Button onClick={() => this.handleOpenNotice('success','bottomLeft')} type="danger">左下</Button>
                </Card>
           </div>
        );
    }
}