import React, { Component } from "react";
import { Card, Table, message, Button ,Modal, Badge} from "antd";
import axios from "../../axios";
import utils  from "../../utils/utils";
// import "./ui.less";

export default class HighTable extends Component {
    state = {
        dataSource: []
    }
    params = {
        page: 1,
        pageSize: 20,
        key:1
    }
    componentDidMount() {
       this.request();
    }
    //动态获取数据
    request = () => {
        axios.ajax({
            url: 'table/high/list',
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
                    item.key =  this.params.key++;
                });
                this.setState({
                    dataSource: res.result.list,
                    selectedRowKeys:[],
                    selectedRows:null
                });
            }
        });
    }
    
    handleChange = (pagination,filters,sorter) => {
       // console.log(sorter);
        this.setState({
            sortOrder: sorter.order
        });
    }

    handleDelete = (item) => {
        let id = item.key;
        Modal.confirm({
            title:"确认",
            content:"确认删除吗?"+id,
            onOk:()=>{
                message.success("删除成功");
                this.request();
            }
        })
    }

    render() {
        const columns = [
            {
                title: '序号',
                width:80,
                dataIndex: 'index',
            },
            {
                title: '姓名',
                width: 100,
                dataIndex: 'name',
            },
            {
                title: '性别',
                width: 100,
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
                width: 100,
                dataIndex: 'age',
            }, {
                title: '住址',
                dataIndex: 'address',

            }];
        const columns2 = [
            {
                title: '序号',
                width: 80,
                dataIndex: 'index',
                fixed:'left'
            },
            {
                title: '姓名',
                width: 100,
                dataIndex: 'name',
                fixed: 'left'
            },
            {
                title: '性别',
                width: 100,
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ?'男':'女'
                }
            }
            , {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            },
            {
                title: '姓名',
                width: 100,
                dataIndex: 'name',
            },
            {
                title: '性别',
                width: 100,
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            }
            , {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            },
            {
                title: '姓名',
                width: 100,
                dataIndex: 'name',
            },
            {
                title: '性别',
                width: 100,
                dataIndex: 'sex',
                render(sex) {
                    return sex === 1 ? '男' : '女'
                }
            }
            , {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '住址',
                dataIndex: 'address',
                fixed: 'right'
            }];
        columns2.map((item,i)=>{
            item.key = this.params.key++;
        });
        const columns3 = [
            {
                title: '序号',
                width: 80,
                dataIndex: 'index',
            },
            {
                title: '姓名',
                width: 100,
                dataIndex: 'name',
            },
            {
                title: '性别',
                width: 100,
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
                width: 100,
                dataIndex: 'age',
                sorter:(a,b)=>{
                    return a.age - b.age;
                },
                sortOrder: this.state.sortOrder
            }, {
                title: '住址',
                dataIndex: 'address',

            }];
        const columns4 = [
            {
                title: '序号',
                width: 80,
                dataIndex: 'index',
            },
            {
                title: '姓名',
                width: 100,
                dataIndex: 'name',
            },
            {
                title: '性别',
                width: 100,
                dataIndex: 'sex',
                render(sex) {
                     return sex === 1 ? 
                         (<Badge status="success" text="男" />) : (<Badge status="error" text="女" />)
                }
            }
            , {
                title: '年龄',
                width: 100,
                dataIndex: 'age',
            }, {
                title: '住址',
                width: 120,
                dataIndex: 'address',

            }, {
                title: '操作',
                render:(text,item) =>{
                    return <Button size="small" onClick={()=>{this.handleDelete(item)}}>删除</Button>
                }

            }
            ];
        return (
            <div>
                <Card title="头部固定" className="card-warp">
                    <Table
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                        columns={columns}
                        scroll={{y:240}}
                    />
                </Card>
                <Card title="左侧固定" className="card-warp">
                    <Table
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                        columns={columns2}
                        scroll={{x:2150}}
                    />
                </Card>
                <Card title="表格排序" className="card-warp">
                    <Table
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                        columns={columns3}
                        onChange={this.handleChange}
                    />
                </Card>
                <Card title="操作按钮" className="card-warp">
                    <Table
                        bordered
                        pagination={false}
                        dataSource={this.state.dataSource}
                        columns={columns4}
                    />
                </Card>
            </div>
        );
    }
}
