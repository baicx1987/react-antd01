import React, { Component } from "react";
import { Card, Button, Icon,Radio} from "antd";
import "./ui.less";

export default class Buttons extends Component {
    state = {
            loadState:true,
            size:"default"
    }
    handleCloseLoading = () => {
        this.setState({
            loadState: !this.state.loadState
        });
    }
    handleChangeSize = (e) => {
        this.setState({
            size:e.target.value
        });
    }
    render() {
        return (
            <div>
                <Card title="基础按钮" className="card-warp">
                    <Button type="primary">Imooc</Button>
                    <Button>Imooc</Button>
                    <Button type="dashed">Imooc</Button>
                    <Button type="danger">Imooc</Button>
                    <Button disabled>Imooc</Button>
                </Card>
                <Card title="图形按钮" className="card-warp">
                    <Button icon="plus">创建</Button>
                    <Button icon="edit">编辑</Button>
                    <Button icon="delete">删除</Button>
                    <Button icon="search" shape="circle"></Button>
                    <Button icon="search">搜索</Button>
                    <Button icon="download">下载</Button>
                </Card>
                <Card title="Loading按钮" className="card-warp">
                    <Button type="primary" loading={this.state.loadState}>确定</Button>
                    <Button type="primary" shape="circle" loading={this.state.loadState}></Button>
                    <Button loading={this.state.loadState}>点击加载</Button>
                    <Button shape="circle" loading={this.state.loadState}></Button>
                    <Button type="primary" onClick={this.handleCloseLoading}>关闭</Button>
                </Card>
                <Card title="按钮组" style={{marginBottom:"10px"}}>
                    <Button.Group>
                        <Button type="primary">
                            <Icon type="left"></Icon>返回
                        </Button>
                        <Button type="primary">
                            前进 <Icon type="right"></Icon>
                        </Button>
                    </Button.Group>
                </Card>
                <Card title="按钮大小" className="card-warp">
                    <Radio.Group value={this.state.size} onChange={this.handleChangeSize}>
                        <Radio value="small">小</Radio>
                        <Radio value="defaule">中</Radio>
                        <Radio value="large">大</Radio>
                    </Radio.Group>
                    <Button size={this.state.size} type="primary">Imooc</Button>
                    <Button size={this.state.size}>Imooc</Button>
                    <Button size={this.state.size} type="dashed">Imooc</Button>
                    <Button size={this.state.size} type="danger">Imooc</Button>
                    <Button size={this.state.size} disabled>Imooc</Button>
                </Card>
           </div>
        );
    }
}