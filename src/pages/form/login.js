import React, { Component } from "react";
import { Card, Form, Input, Button, message, Icon, Checkbox } from "antd";
// import "./ui.less";

class Login extends Component {
    state = {
    }
    handleClick = () =>{
        let userInfo = this.props.form.getFieldsValue();
        this.props.form.validateFields((err,values)=>{
            if(!err){
                message.success(`${userInfo.userName}提交成功，密码为：${userInfo.pwd}`);
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Card title="登录行内表单" className="card-warp">
                    <Form layout="inline">
                        <Form.Item>
                            <Input placeholder="请输入用户名" />
                        </Form.Item>
                        <Form.Item>
                            <Input type="password" placeholder="请输入密码" />
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary">登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
                <Card title="登录水平表单" className="card-warp">
                    <Form style={{ width: 300 }} layout="horizontal">
                        <Form.Item>
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required:true,
                                            message:'用户名不能为空'
                                        },{
                                            min:5,max:10,
                                            message:'长度不再范围内'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="user"/>} placeholder="请输入用户名" />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('pwd', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '密码不能为空'
                                        }
                                    ]
                                })(
                                    <Input prefix={<Icon type="lock" />} type="password" placeholder="请输入密码" />
                                )
                            }
                        </Form.Item>
                        <Form.Item>
                            {
                                getFieldDecorator('remeber', {
                                    valuePropName:'checked',
                                    initialValue: false,
                                    rules: [
                                    ]
                                })(
                                    <Checkbox>记住密码</Checkbox>
                                )
                            }
                            <a href="#" style={{float:'right'}}>忘记密码</a>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" onClick={this.handleClick}>登录</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Login);