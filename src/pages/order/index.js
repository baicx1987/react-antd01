import React, { Component } from "react";
import { Card, Form, Table, message, Button, Modal, Select, DatePicker } from "antd";
import axios from "../../axios";
import utils from "../../utils/utils";

export default class Order extends Component {

    state = {
        list: [],
        orderInfo: {},
        orderConfirmVisble: false
    }
    params = {
        page: 1
    }
    //请求接口数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/order/list',
            data: {
                params: {
                    page: this.params.page
                }
            }
        }).then((res) => {
            this.setState({
                list: res.result.item_list.map((item, index) => {
                    item.key = index;
                    return item;
                }),
                pagination: utils.pagination(res, (current) => {
                    _this.params.page = current;
                    _this.requestList();
                })
            });
        })
    }

    componentDidMount() {
        this.requestList();
    }

    // 订单结束确认
    handleConfirm = () => {
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单进行结束'
            })
            return;
        }
        axios.ajax({
            url: '/order/ebike_info',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == '0') {
                this.setState({
                    orderInfo: res.result,
                    orderConfirmVisble: true
                })
            }
        })
    }

    // 结束订单
    handleFinishOrder = () => {
        let item = this.state.selectedItem;
        axios.ajax({
            url: '/order/finish_order',
            data: {
                params: {
                    orderId: item.id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                message.success('订单结束成功');
                this.setState({
                    orderConfirmVisble: false
                })
                this.requestList();
            }
        })
    }

    openOrderDitail = () =>{
        let item = this.state.selectedItem;
        if (!item) {
            Modal.info({
                title: '信息',
                content: '请选择一条订单'
            })
            return;
        }
        window.open('/#/common/order/detail/'+item.id);
    }

    onRowClick = (record, index) => {
        let selectKey = [index];
        this.setState({
            selectedRowKeys: selectKey,
            selectedItem: record
        })
    }
    onSelectChange = (selectedRowKeys, records) => {
        this.setState({ 
            selectedRowKeys,
            selectedItem: records[0]
        });
    }
    render() {
        const columns = [
            {
                title: '订单编号',
                dataIndex: 'order_sn'
            },
            {
                title: '车辆编号',
                dataIndex: 'bike_sn'
            },
            {
                title: '用户名',
                dataIndex: 'user_name'
            },
            {
                title: '手机号码',
                dataIndex: 'mobile'
            },
            {
                title: '里程',
                dataIndex: 'distance',
                render(distance) {
                    return distance / 1000 + 'Km';
                }
            },
            {
                title: '行驶时长',
                dataIndex: 'total_time'
            },
            {
                title: '状态',
                dataIndex: 'status'
            },
            {
                title: '开始时间',
                dataIndex: 'start_time'
            },
            {
                title: '结束时间',
                dataIndex: 'end_time'
            },
            {
                title: '订单金额',
                dataIndex: 'total_fee'
            },
            {
                title: '实付金额',
                dataIndex: 'user_pay'
            },
        ];
        const selectedRowKeys = this.state.selectedRowKeys;
        const rowSelection = {
            type: 'radio',
            selectedRowKeys,
            onChange: this.onSelectChange
        }
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{ marginTop: 10 }}>
                    <Button type="primary" onClick={this.openOrderDitail}>订单详情</Button>
                    <Button style={{ margin: '0 20px' }} type="danger" onClick={this.handleConfirm}>结束订单</Button>
                </Card>
                <div className="content-warp">
                    <Table
                        rowSelection={rowSelection}
                        bordered={true}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            };
                        }}
                    />
                </div>
                <Modal
                    title="结束订单"
                    visible={this.state.orderConfirmVisble}
                    onCancel={() => {
                        this.setState({
                            orderConfirmVisble: false
                        })
                    }}
                    onOk={this.handleFinishOrder}
                    width={600}
                >
                    <Form layout="horizontal">
                        <Form.Item label="车辆编号" {...formItemLayout}>
                            {this.state.orderInfo.bike_sn}
                        </Form.Item>
                        <Form.Item label="剩余电量" {...formItemLayout}>
                            {this.state.orderInfo.battery + '%'}
                        </Form.Item>
                        <Form.Item label="行程开始时间" {...formItemLayout}>
                            {this.state.orderInfo.start_time}
                        </Form.Item>
                        <Form.Item label="当前位置" {...formItemLayout}>
                            {this.state.orderInfo.location}
                        </Form.Item>
                    </Form>
                </Modal>
            </div>
        );
    }
}

class FilterForm extends Component {
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form layout="inline">
                <Form.Item label="城市">
                    {
                        getFieldDecorator('city_id')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">北京市</Select.Option>
                                <Select.Option value="2">天津市</Select.Option>
                                <Select.Option value="3">上海市</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="订单时间">
                    {
                        getFieldDecorator('start_time')(
                            <DatePicker
                                style={{ width: 200 }}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                        )
                    }
                </Form.Item>
                <Form.Item label="~" colon={false}>
                    {
                        getFieldDecorator('end_time')(
                            <DatePicker
                                style={{ width: 200 }}
                                showTime
                                format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                        )
                    }
                </Form.Item>
                <Form.Item label="订单状态">
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 140 }}
                                placeholder="全部"
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">进行中</Select.Option>
                                <Select.Option value="2">结束行程</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>

                <Form.Item>
                    <Button type="primary" style={{ margin: '0 20px' }}>查询</Button>
                    <Button>重置</Button>
                </Form.Item>
            </Form>
        );
    }
}
FilterForm = Form.create({})(FilterForm);
