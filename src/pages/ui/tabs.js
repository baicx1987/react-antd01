import React, { Component } from "react";
import { Card, Tabs, message,Icon} from "antd";
import "./ui.less";

export default class TabsPage extends Component {
    state = {
    }
    newTabIndex = 3;
    componentWillMount(){
        
        const panes = [
            {
                title:'Tab1',
                content:'tab01',
                key:'1'
            },
            {
                title: 'Tab2',
                content: 'tab02',
                key: '2'
            },
            {
                title: 'Tab3',
                content: 'tab03',
                key: '3'
            },
        ]
        this.setState({
            panes,
            activeKey:panes[0].key
        })
    }
    tabOnChange = (activeKey) => {
        this.setState({
            activeKey
        })
        message.info("选择了：" + activeKey);
    }
    tabOnEdit = (targetKey,action) => {
        this[action](targetKey);
    }
    add = () => {
        const panes = this.state.panes;
        const activeKey = `newTab${this.newTabIndex}`;
        panes.push({ title: `New Tab${this.newTabIndex++}`, content: 'Content of new Tab', key: activeKey });
        this.setState({ panes, activeKey });
    }

    remove = (targetKey) => {
        let activeKey = this.state.activeKey;
        let lastIndex;
        this.state.panes.forEach((pane, i) => {
            if (pane.key === targetKey) {
                lastIndex = i - 1;
            }
        });
        const panes = this.state.panes.filter(pane => pane.key !== targetKey);
        if (lastIndex >= 0 && activeKey === targetKey) {
            activeKey = panes[lastIndex].key;
        }
        this.setState({ panes, activeKey });
    }

    tabCallBack = (key) => {
        message.info("选择了："+key);
    }
    render() {
        return (
            <div>
                <Card title="Tab页签" className="card-warp">
                    <Tabs defaultActiveKey="1" onChange={this.tabCallBack}>
                        <Tabs.TabPane tab="tab01" key="1">tab01</Tabs.TabPane>
                        <Tabs.TabPane tab="tab02" key="2">tab02</Tabs.TabPane>
                        <Tabs.TabPane tab="tab03" key="3">tab03</Tabs.TabPane>
                    </Tabs>
                </Card>
                <Card title="图标页签" className="card-warp">
                    <Tabs defaultActiveKey="1" onChange={this.tabCallBack}>
                        <Tabs.TabPane tab={<span><Icon type="apple"></Icon>tab01</span>} key="1">tab01</Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type="android"></Icon>tab02</span>} key="2">tab02</Tabs.TabPane>
                        <Tabs.TabPane tab={<span><Icon type="plus"></Icon>tab03</span>} key="3">tab03</Tabs.TabPane>
                    </Tabs>
                </Card>
                <Card title="动态页签" className="card-warp">
                    <Tabs 
                        onChange={this.tabOnChange}
                        activeKey={this.state.activeKey}
                        type="editable-card"
                        onEdit={this.tabOnEdit}
                    >
                        {
                            this.state.panes.map((pane) => {
                                return (
                                    <Tabs.TabPane 
                                        tab={pane.title}
                                        key={pane.key}
                                    >{pane.content}</Tabs.TabPane>
                                );
                            })
                        }
                    </Tabs>
                </Card>
           </div>
        );
    }
}