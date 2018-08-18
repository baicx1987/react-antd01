import React, { Component } from "react";
import { Card, Form, Table, message, Button, Modal, Select } from "antd";
import axios from "../../axios";
import utils from "../../utils/utils";

export default class City extends Component {

    state = {

    }
    params = {
        page: 1
    }
    //请求接口数据
    requestList = () => {
        let _this = this;
        axios.ajax({
            url: '/open_city',
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

    //开通城市
    handleOpenCity = () => {

    }
    render() {
        const columns = [
            {
                title: '城市ID',
                dataIndex: 'id'
            },
            {
                title: '城市名称',
                dataIndex: 'name'
            },
            {
                title: '用车模式',
                dataIndex: 'mode'
            },
            {
                title: '运营模式',
                dataIndex: 'op_mode'
            },
            {
                title: '授权加盟商',
                dataIndex: 'franchisee_name'
            },
            {
                title: '城市管理员',
                dataIndex: 'city_admins',
                render: (arr) => {
                    return arr.map((item) => {
                        return item.user_name
                    }).join(',');
                }
            },
            {
                title: '城市开通时间',
                dataIndex: 'open_time'
            },
            {
                title: '操作时间',
                dataIndex: 'update_time'
            },
            {
                title: '操作人',
                dataIndex: 'sys_user_name'
            },
        ]
        return (
            <div>
                <Card>
                    <FilterForm />
                </Card>
                <Card style={{marginTop:10}}>
                    <Button type="primary" onClick={this.handleOpenCity}>开通城市</Button>
                </Card>
                <div className="content-warp">
                    <Table
                        bordered={true}
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                    />
                </div>
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
                <Form.Item label="用车模式">
                    {
                        getFieldDecorator('mode')(
                            <Select
                                style={{ width: 140 }}
                                placeholder="全部"
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">指定停车点模式</Select.Option>
                                <Select.Option value="2">进停区模式</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="运营模式">
                    {
                        getFieldDecorator('op_mode')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">自营</Select.Option>
                                <Select.Option value="2">加盟</Select.Option>
                            </Select>
                        )
                    }
                </Form.Item>
                <Form.Item label="加盟商状态">
                    {
                        getFieldDecorator('auth_status')(
                            <Select
                                style={{ width: 80 }}
                                placeholder="全部"
                            >
                                <Select.Option value="">全部</Select.Option>
                                <Select.Option value="1">已授权</Select.Option>
                                <Select.Option value="2">未授权</Select.Option>
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