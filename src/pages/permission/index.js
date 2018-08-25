import React, { Component } from "react";
import { Card, Form, Input, Button, Badge, Modal, Select, Tree,Transfer} from "antd";
import axios from "../../axios";
import utils from "../../utils/utils";
import ETable from "../../components/ETable";
import menuConfig from "../../config/menuConfig";

const FormItem = Form.Item;
const Option = Select.Option;
const TreeNode = Tree.TreeNode;
export default class PermissionUser extends Component {

    state = {
        list: [],
        isRoleVisible: false,
        isPermVisible: false,
        isUserAuthVisible: false,
    }
    params = {
    }
    componentWillMount() {
        this.requestList();
    }

    //请求接口数据
    requestList = () => {
        axios.requestList(this, '/role/list', this.params, true);
    }

    handleCreateRole = () => {
        this.setState({
            isRoleVisible: true,
        });
    }

    //创建角色提交
    handleRoleSubmit = () => {
        let data = this.roleForm.props.form.getFieldsValue();
        axios.ajax({
            url: '/role/create',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isRoleVisible: false,
                });
                this.roleForm.props.form.resetFields();
                this.requestList();
            }
        })

    }

    //设置权限
    handlePermission = () => {
        let items = this.state.selectedItem;
        if (!items || items.length > 1) {
            Modal.info({
                title: '信息',
                content: '请选择一条数据'
            })
            return;
        }
        this.setState({
            isPermVisible: true,
            detailInfo: items[0],
            menuInfo: items[0].menus
        })
    }

    handlePremSubmit = () => {
        let data = this.permEditForm.props.form.getFieldsValue();
        data.role_id = this.state.selectedItem[0].id;
        data.menus = this.state.menuInfo;
        axios.ajax({
            url: '/role/edit',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isPermVisible: false,
                });
                this.requestList();
            }
        })
    }

    //用户授权
    handleUserAuth = () => {
        let items = this.state.selectedItem;
        if (!items || items.length > 1) {
            Modal.info({
                title: '信息',
                content: '请选择一条数据'
            })
            return;
        }
        this.setState({
            isUserAuthVisible: true,
            detailInfo: items[0],
        })
        this.getRoleUserList(items[0].id);
    }

    //获取用户列表
    getRoleUserList = (id) => {
        axios.ajax({
            url: '/role/userlist',
            data: {
                params: {
                    id
                }
            }
        }).then((res) => {
            if (res.code == 0) {
                this.getAuthUserList(res.result);
            }
        })
    }

    //获取目标用户
    getAuthUserList = (mockData) => {
        const userDataSource = [];
        const userTargetKeys = [];
        if (mockData && mockData.length > 0) {
            mockData.forEach((item) => {
                const data = {
                    key: item.user_id,
                    title: item.user_name,
                    status: item.status
                }
                if (data.status == 1) {
                    userTargetKeys.push(data.key);
                } 
                
                userDataSource.push(data);
                
            });
        }
        this.setState({
            userDataSource,
            userTargetKeys
        })
    }

    handleUserAuthSubmit = () =>{
        let data = {};
        data.role_id = this.state.selectedItem[0].id;
        data.user_ids = this.state.userTargetKeys;
        axios.ajax({
            url: '/role/useredit',
            data: {
                params: data
            }
        }).then((res) => {
            if (res.code == 0) {
                this.setState({
                    isUserAuthVisible: false,
                });
                this.requestList();
            }
        })
    }

    render() {
        const columns = [
            {
                title: '角色ID',
                dataIndex: 'id'
            }, {
                title: '角色名称',
                dataIndex: 'role_name'
            }, {
                title: '创建时间',
                dataIndex: 'create_time',
                render: utils.formateDate
            }, {
                title: '使用状态',
                dataIndex: 'status',
                render(status) {
                    if (status == 1) {
                        return <Badge status="success" text="启用" />
                    } else {
                        return <Badge status="error" text="停用" />
                    }
                }
            }, {
                title: '授权时间',
                dataIndex: 'authorize_time',
                render: utils.formateDate
            }, {
                title: '授权人',
                dataIndex: 'authorize_user_name',
            }
        ];
        return (
            <div>
                <Card>
                    <Button style={{ marginRight: 10 }} type="primary" onClick={this.handleCreateRole} >创建角色</Button>
                    <Button style={{ marginRight: 10 }} onClick={this.handlePermission}>设置权限</Button>
                    <Button style={{ marginRight: 10 }} onClick={this.handleUserAuth}>用户授权</Button>
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
                    title="创建角色"
                    visible={this.state.isRoleVisible}
                    onOk={this.handleRoleSubmit}
                    onCancel={() => {
                        this.roleForm.props.form.resetFields();
                        this.setState({
                            isRoleVisible: false
                        })
                    }}
                >
                    <RoleForm
                        wrappedComponentRef={(inst) => { this.roleForm = inst }}
                    ></RoleForm>
                </Modal>
                <Modal
                    title="设置角色"
                    width={600}
                    visible={this.state.isPermVisible}
                    onOk={this.handlePremSubmit}
                    onCancel={() => {
                        this.setState({
                            isPermVisible: false
                        })
                    }}
                >
                    <PermEditForm
                        detailInfo={this.state.detailInfo}
                        pachMenuInfo={(checkedKeys) => {
                            this.setState({
                                menuInfo: checkedKeys
                            });
                        }}
                        menuInfo={this.state.menuInfo}
                        wrappedComponentRef={(inst) => { this.permEditForm = inst }}
                    ></PermEditForm>
                </Modal>
                <Modal
                    title="用户授权"
                    width={800}
                    visible={this.state.isUserAuthVisible}
                    onOk={this.handleUserAuthSubmit}
                    onCancel={() => {
                        this.setState({
                            isUserAuthVisible: false
                        })
                    }}
                >
                    <UserAuthForm
                        detailInfo={this.state.detailInfo}
                        userDataSource={this.state.userDataSource}
                        userTargetKeys={this.state.userTargetKeys}
                        pachUserInfo={(targetKeys) => {
                            this.setState({
                                userTargetKeys: targetKeys
                            });
                        }}
                        wrappedComponentRef={(inst) => { this.userAuthForm = inst }}
                    ></UserAuthForm>
                </Modal>
            </div>
        );
    }
}

class RoleForm extends Component {

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator("role_name")(
                            <Input type="text"
                                placeholder="请输入角色名称"
                            ></Input>
                        )
                    }
                </FormItem>

                <FormItem label="状态" {...formItemLayout}>
                    {

                        getFieldDecorator("status")(
                            <Select
                                placeholder="请选择"
                            >
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
            </Form>
        );
    }
}
RoleForm = Form.create({})(RoleForm);

class PermEditForm extends Component {
    renderTreeNode = (data) => {
        return data.map((item) => {
            if (item.children) {
                return (
                    <TreeNode title={item.title} key={item.key}>
                        {this.renderTreeNode(item.children)}
                    </TreeNode>
                );
            } else {
                return (
                    <TreeNode title={item.title} key={item.key}>
                    </TreeNode>
                );
            }
        })
    }
    onCheckedKeys = (checkedKeys) => {
        this.props.pachMenuInfo(checkedKeys);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const { detailInfo, menuInfo } = this.props;

        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator("role_name", {
                            initialValue: detailInfo.role_name
                        })(
                            <Input type="text"
                                disabled
                            ></Input>
                        )
                    }
                </FormItem>
                <FormItem label="状态" {...formItemLayout}>
                    {

                        getFieldDecorator("status", {
                            initialValue: detailInfo.status
                        })(
                            <Select
                                placeholder="请选择"
                            >
                                <Option value={1}>开启</Option>
                                <Option value={0}>关闭</Option>
                            </Select>
                        )
                    }
                </FormItem>
                <Tree
                    checkable
                    defaultExpandAll
                    onCheck={this.onCheckedKeys}
                    checkedKeys={menuInfo}
                >
                    <TreeNode title="平台权限">
                        {
                            this.renderTreeNode(menuConfig)
                        }
                    </TreeNode>
                </Tree>
            </Form>
        );
    }
}
PermEditForm = Form.create({})(PermEditForm);

class UserAuthForm extends Component {
    filterOption = (inputValue, option) => {
        return option.title.indexOf(inputValue) > -1;
    }
    handleChange = (targetKeys)=>{
        this.props.pachUserInfo(targetKeys);
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: { span: 5 },
            wrapperCol: { span: 19 }
        }
        const { detailInfo,userDataSource, userTargetKeys } = this.props;
        return (
            <Form layout="horizontal">
                <FormItem label="角色名称" {...formItemLayout}>
                    {
                        getFieldDecorator("role_name", {
                            initialValue: detailInfo.role_name
                        })(
                            <Input type="text"
                                disabled
                            ></Input>
                        )
                    }
                </FormItem>
                <FormItem label="选择用户" {...formItemLayout}>
                    <Transfer
                        listStyle={{width:200,height:400}}
                        dataSource={userDataSource}
                        targetKeys={userTargetKeys}
                        titles={['待选用户','已选用户']}
                        showSearch
                        searchPlaceholder="输入用户名"
                        filterOption={this.filterOption}
                        onChange={this.handleChange}
                        render={(item)=>{
                            return item.title
                        }}
                    >
                    </Transfer>
                </FormItem>
            </Form>
        );
    }
}
UserAuthForm = Form.create({})(UserAuthForm);