import React, { Component } from "react";
import { Card, Button, Modal} from "antd";
import "./ui.less";

export default class Modals extends Component {
    state = {
        showModal1:false,
        showModal2: false,
        showModal3: false,
        showModal4: false
    }
    handleOpenModal = (type) =>{
        this.setState({
            [type]: true
        });
    }
    handleConfirmModal = (type) =>{
        Modal[type]({
            title:"确认",
            content:"确定学会了吗？",
            onOk(){
                console.log("ok");
            },
            onCancel(){
                console.log("cancel");
            }
        });
    }
    render() {
        return (
            <div>
                <Card title="基础模态框" className="card-warp">
                    <Button onClick={() => this.handleOpenModal('showModal1')} type="primary">Open</Button>
                    <Button onClick={() => this.handleOpenModal('showModal2')}>自定义页脚</Button>
                    <Button onClick={() => this.handleOpenModal('showModal3')} type="dashed">顶部20px弹窗</Button>
                    <Button onClick={() => this.handleOpenModal('showModal4')} type="danger">水平垂直居中</Button>
                </Card>
                <Modal
                    title="React"
                    visible={this.state.showModal1} 
                    onCancel={() => {
                        this.setState({
                            showModal1: false
                        })
                    }}>
                    <p>
                        欢迎1
                    </p>
                </Modal>
                <Modal
                    title="React"
                    visible={this.state.showModal2}
                    okText="下一步"
                    cancelText="算了"
                    onCancel={() => {
                        this.setState({
                            showModal2: false
                        })
                    }}>
                    <p>
                        欢迎2
                    </p>
                </Modal>
                <Modal
                    title="React"
                    style={{top:"20px"}}
                    visible={this.state.showModal3}
                    onCancel={() => {
                        this.setState({
                            showModal3: false
                        })
                    }}>
                    <p>
                        欢迎3
                    </p>
                </Modal>
                <Modal
                    title="React"
                    wrapClassName="vertical-center-model"
                    visible={this.state.showModal4}
                    onCancel={() => {
                        this.setState({
                            showModal4: false
                        })
                    }}>
                    <p>
                        欢迎4
                    </p>
                </Modal>
                <Card title="基础确认框" className="card-warp">
                    <Button onClick={() => this.handleConfirmModal('confirm')} type="primary">Confirm</Button>
                    <Button onClick={() => this.handleConfirmModal('info')}>Info</Button>
                    <Button onClick={() => this.handleConfirmModal('success')} type="dashed">Success</Button>
                    <Button onClick={() => this.handleConfirmModal('warning')} type="danger">Warning</Button>
                </Card>
           </div>
        );
    }
}