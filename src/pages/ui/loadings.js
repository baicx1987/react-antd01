import React, { Component } from "react";
import { Card, Button, Icon,Spin,Alert} from "antd";
import "./ui.less";

export default class Loading extends Component {
    state = {
    }
    render() {
        const icon = <Icon type="loading" style={{fontSize:"24px"}}/>
        return (
            <div>
                <Card title="Spin用法" className="card-warp">
                    <Spin size="small"/>
                    <Spin style={{margin:"0 10px"}}/>
                    <Spin size="large"/>
                    <Spin style={{ margin: "0 10px" }} spinning={true} indicator={icon}/>
                </Card>
                <Card title="内容遮罩" className="card-warp">
                    {/* <Alert type="warning" message="提示" description="欢迎来到react" /> */}
                    <Spin spinning={true}>
                        <Alert type="info" message="提示" description="欢迎来到react" />
                    </Spin>
                </Card>
                <Card title="tip" className="card-warp">
                    <Spin indicator={icon} spinning={true} tip="加载中...">
                        <Alert type="info" message="提示" description="欢迎来到react" />
                    </Spin>
                </Card>
           </div>
        );
    }
}