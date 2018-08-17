import React, { Component } from "react";
import { Card, Table, message, Button ,Modal} from "antd";
import axios from "../../axios";
import utils  from "../../utils/utils";
// import "./ui.less";

export default class BasicTable extends Component {
    state = {
        dataSource2: []
    }
    params = {
        page:1,
        pageSize:5
    }
    componentDidMount() {
        const dataSource = [{
            key: 1,
            index: 1,
            name: '胡彦斌',
            sex: 1,
            age: 32,
            address: '西湖区湖底公园1号'
        }, {
            key: 2,
            index: 2,
            name: '胡彦祖',
            sex: 2,
            age: 42,
            address: '西湖区湖底公园1号'
        }];
        this.setState({
            dataSource
        });
        this.request();
    }
    //动态获取数据
    request = () => {
        let _this = this;
        axios.ajax({
            url: 'table/list',
            data: {
                params: {
                    page: this.params.page,
                    pageSize: this.params.pageSize
                },
                //isShowLoading:false
            }
        }).then((res) => {
            if (res.code === 0) {
                res.result.list.map((item, i) => {
                    item.key = i;
                });
                this.setState({
                    dataSource2: res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null,
                    pagination: utils.pagination(res, (current, pageSize)=>{
                        //message.info(current);
                        _this.params.page = current;
                        _this.params.pageSize = pageSize;
                        _this.request();
                    })
                });
            }
        });
    }
    onRowClick = (record, index) => {
        let selectKey = [index];
        message.info(`姓名：${record.name}`);
        this.setState({
            selectedRadioRowKeys: selectKey,
            selectedItem: record
        })
    }
    handleTableRemove = () => {
        let ids = this.state.selectedIds;
        Modal.confirm({
            title:'删除提示',
            content: `您确定删除这些数据吗?${ids.join(',')}`,
            onOk:()=>{
                message.info('删除成功');
                this.request();
            }
        })
        // this.state.selectedIds.map((item)=>{
           
        // });
    }

    render() {
        const columns = [
            {
                title: '序号',
                dataIndex: 'index',
            },
            {
                title: '姓名',
                dataIndex: 'name',
            },
            {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    // return sex === 1 ?'男':'女'
                    let config = {
                        '1': '男',
                        '2': '女',
                        '3': '未知'
                    }
                    return config[sex];
                }
            }
            , {
                title: '年龄',
                dataIndex: 'age',
            }, {
                title: '住址',
                dataIndex: 'address',

            }];

        return (
            <div>
                <Card title="基础表格" className="card-warp">
                    <Table
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                        columns={columns}
                    />
                </Card>
                <Card title="动态数据渲染表格" className="card-warp">
                    <Table
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                    />
                </Card>
                <Card title="Mock-单选" className="card-warp">
                    <Table
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        rowSelection={{
                            type: 'radio',
                            selectedRowKeys: this.state.selectedRadioRowKeys
                        }}
                        onRow={(record, index) => {
                            return {
                                onClick: () => {
                                    this.onRowClick(record, index);
                                }
                            }
                        }}
                    />
                </Card>
                <Card title="Mock-复选" className="card-warp">
                    <div style={{marginBottom:10}}>
                        <Button type="primary" onClick={this.handleTableRemove}>
                            删除选中行
                        </Button>
                    </div>
                    <Table
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                        rowSelection={{
                            type: 'checkbox',
                            selectedRowKeys: this.state.selectedRowKeys,
                            onChange: (selectedRowKeys, selectedRows) => {
                                let selectedIds = [];
                                selectedRows.map((item) => {
                                    selectedIds.push(item.key);
                                });
                                this.setState({
                                    selectedRowKeys,
                                    selectedRows,
                                    selectedIds
                                })
                            }
                        }}
                    />
                </Card>
                <Card title="Mock-表格分页" className="card-warp">
                    <Table
                        bordered
                        pagination={this.state.pagination}
                        dataSource={this.state.dataSource2}
                        columns={columns}
                    />
                </Card>
            </div>
        );
    }
}
