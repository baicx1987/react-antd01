import React, { Component } from "react";
import moment from "moment";
import { Card, Button, Modal, Form, Input,Radio,DatePicker,Select} from "antd";
import axios from "../../axios";
import utils from "../../utils/utils";
import BaseForm from "../../components/BaseForm";
import ETable from "../../components/ETable";

const FormItem = Form.Item;
const RadioGroup = Radio.Group;
const TextArea = Input.TextArea;
const Option = Select.Option;

export default class User extends Component{
    state = {
        list: [],
    }
    params = {
        page: 1
    }
    formList = [
        {
            type: 'INPUT',
            label: '用户名',
            field: 'user_name',
            placeholder: '请输入用户名',
            width: 100,
        },
        {
            type: 'INPUT',
            label: '手机号',
            field: 'user_mobile',
            placeholder: '请输入手机号',
            width: 100,
        },
        {
            type: 'DATAPICKER',
            label: '入职日期',
            field: 'user_date',
            placeholder: '请输入入职日期',
            width: 100,
        },
    ]
    //请求接口数据
    requestList = () => {
        axios.requestList(this, '/user/list', this.params, true);
    }

    componentDidMount() {
        this.requestList();
    }

    //查询提交
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    //功能区操作
    handleOperate = (type) => {
        let _this = this;
        if(type === 'create'){
            this.setState({
                type,
                isVisible:true,
                title:'创建员工'
            })
        } else if (type === 'edit'){
            let items = this.state.selectedItem;
            if (!items || items.length > 1) {
                Modal.info({
                    title: '信息',
                    content: '请选择一条数据'
                })
                return;
            }

            this.setState({
                type,
                isVisible: true,
                title: '编辑员工',
                userInfo:items[0]
            })
        } else if (type === 'detail') {
            let items = this.state.selectedItem;
            if (!items || items.length > 1) {
                Modal.info({
                    title: '信息',
                    content: '请选择一条数据'
                })
                return;
            }
            this.setState({
                type,
                isVisible: true,
                title: '员工详情',
                userInfo: items[0]
            })
        } else if (type === 'delete') {
            let items = this.state.selectedItem;
            if (!items || items.length > 1) {
                Modal.info({
                    title: '信息',
                    content: '请选择一条数据'
                })
                return;
            }
            Modal.confirm({
                title: '确认删除',
                content:'是否要删除选中的数据',
                onOk(){
                    axios.ajax({
                        url:'/user/delete',
                        data:{
                            params:{
                                id:items[0].id
                            }
                        }
                    }).then((res)=>{
                        if(res.code==0){
                            _this.setState({
                                isVisible:false
                            })
                            _this.requestList();
                        }
                    })
                }
            })
        }
    }

    //创建员工提交
    handleSubmit = () => {
        let type = this.state.type;
        let data = this.userForm.props.form.getFieldsValue();
        // if(type==='edit'){
        //     data.id = this.state.userInfo.id;
        // }
        axios.ajax({
            url:type==='create'?'/user/add':'/user/edit',
            data:{
                params:data
            }
        }).then((res)=>{
            if(res.code==0){
                this.userForm.props.form.resetFields();
                this.setState({
                    isVisible: false,
                });
                this.requestList();
            }
        })
    }

    render(){
        const columns = [
            {
                title: 'id',
                dataIndex: 'id'
            }, {
                title: '用户名',
                dataIndex: 'username'
            }, {
                title: '性别',
                dataIndex: 'sex',
                render(sex) {
                    return sex == 1 ? '男' : '女'
                }
            }, {
                title: '状态',
                dataIndex: 'state',
                render(state) {
                    let config = {
                        '1': '咸鱼一条',
                        '2': '风华浪子',
                        '3': '北大才子一枚',
                        '4': '百度FE',
                        '5': '创业者'
                    }
                    return config[state];
                }
            }, {
                title: '爱好',
                dataIndex: 'interest',
                render(interest) {
                    let config = {
                        '1': '游泳',
                        '2': '打篮球',
                        '3': '踢足球',
                        '4': '跑步',
                        '5': '爬山',
                        '6': '骑行',
                        '7': '桌球',
                        '8': '麦霸'
                    }
                    return config[interest];
                }
            }, {
                title: '爱好',
                dataIndex: 'isMarried',
                render(isMarried) {
                    return isMarried ? '已婚' : '未婚'
                }
            }, {
                title: '生日',
                dataIndex: 'birthday'
            }, {
                title: '联系地址',
                dataIndex: 'address'
            }, {
                title: '早起时间',
                dataIndex: 'time'
            }
        ];

        let footer = {};
        if(this.state.type==='detail'){
            footer = {
                footer:null
            }
        }

        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter}></BaseForm>
                </Card>
                <Card style={{ marginTop: 10 }} className="operate-warp">
                    <Button type="primary" icon="plus" onClick={() => this.handleOperate('create') }>创建员工</Button>
                    <Button type="primary" icon="edit" onClick={() => this.handleOperate('edit') }>编辑员工</Button>
                    <Button type="primary" icon="idcard" onClick={() => this.handleOperate('detail') }>员工详情</Button>
                    <Button icon="delete" type="danger" onClick={() => this.handleOperate('delete') }>结束订单</Button>
                </Card>
                <div className="content-warp">
                    <ETable
                        columns={columns}
                        dataSource={this.state.list}
                        pagination={this.state.pagination}
                        selectedRowKeys={this.state.selectedRowKeys}
                        selectedIds={this.state.selectedIds}
                        selectedItem={this.state.selectedItem}
                        updateSelectedItem={utils.updateSelectedItem.bind(this)}
                        rowSelection="radio"
                    ></ETable>
                </div>
                <Modal
                    title={this.state.title}
                    visible={this.state.isVisible}
                    onOk={this.handleSubmit}
                    onCancel={()=>{
                        this.userForm.props.form.resetFields();
                        this.setState({
                            isVisible:false
                        })
                    }}
                    {...footer}
                >
                    <UserForm type={this.state.type}
                        userInfo={this.state.userInfo}
                        wrappedComponentRef={(inst)=>{this.userForm = inst}}
                    ></UserForm>
                </Modal>
            </div>
        );
    }
}

class UserForm extends Component{
    getUserState = (state) =>{
        let config = {
            '1': '游泳',
            '2': '打篮球',
            '3': '踢足球',
            '4': '跑步',
            '5': '爬山',
            '6': '骑行',
            '7': '桌球',
            '8': '麦霸'
        }
        return config[state];
    }
    render(){
        let type = this.props.type;
        let userInfo = this.props.userInfo || {};
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="用户名" {...formItemLayout}>
                    {
                        type === 'detail'? userInfo.username :
                        getFieldDecorator("user_name",{
                            initialValue:userInfo.username
                        })(
                            <Input type="text"
                                placeholder="请输入用户名"
                            ></Input>
                        )
                    }
                </FormItem>
                <FormItem label="性别" {...formItemLayout}>
                    {
                        type === 'detail' ? (userInfo.sex == 1 ? '男' : '女'):
                        getFieldDecorator("sex", {
                            initialValue: userInfo.sex
                        })(
                            <RadioGroup>
                                <Radio value={1}>
                                    男
                                </Radio>
                                <Radio value={2}>
                                    女
                                </Radio>
                            </RadioGroup>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {
                        type === 'detail' ? this.getUserState(userInfo.state) :
                        getFieldDecorator("state", {
                            initialValue: userInfo.state
                        })(
                            <Select
                                placeholder="请选择"
                            >
                                <Option value={1}>咸鱼一条</Option>
                                <Option value={2}>风华浪子</Option>
                                <Option value={3}>北大才子一枚</Option>
                                <Option value={4}>百度FE</Option>
                                <Option value={5}>创业者</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <FormItem label="生日" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.birthday :
                        getFieldDecorator("birthday", {
                            initialValue: moment(userInfo.birthday)
                        })(
                            <DatePicker></DatePicker>
                        )
                    }
                </FormItem>
                <FormItem label="联系地址" {...formItemLayout}>
                    {
                        type === 'detail' ? userInfo.address :
                        getFieldDecorator("address", {
                            initialValue: userInfo.address
                        })(
                            <TextArea rows={3}
                                placeholder="请输入联系地址"
                            >
                            </TextArea>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
UserForm = Form.create({})(UserForm);