import React, { Component } from "react";
import moment from "moment";
import 'moment/locale/zh-cn';
import { Card, Form, Input, Button, message, Icon, Checkbox, Radio, Select, Switch, DatePicker, TimePicker, Upload, InputNumber } from "antd";
// import "./ui.less";

class Reg extends Component {
    state = {
        loading: false,
    }

    getBase64 = (img, callback) =>{
        //debugger;
        const reader = new FileReader();
        reader.addEventListener('load', () => callback(reader.result));
        reader.readAsDataURL(img);
    }

    handleChange = (info) => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            this.getBase64(info.file.originFileObj, imageUrl => this.setState({
                userImg:imageUrl,
                loading: false,
            }));
        }
    }

    handleSubmit = () => {
        let userInfo = this.props.form.getFieldsValue();
        message.info(`提交成功${userInfo.userName}`)
    }

    render() {
        const { getFieldDecorator } = this.props.form;

        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 4 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12 },
            },
        };
        const offsetLayout = {
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 12,
                      offset:4 
                },
            }
        };

        return (
            <div>
                <Card title="注册表单" className="card-warp">
                    <Form>
                        <Form.Item {...formItemLayout} label="用户名">
                            {
                                getFieldDecorator('userName', {
                                    initialValue: '',
                                    rules: [
                                        {
                                            required: true,
                                            message: '用户名不能为空'
                                        }
                                    ]
                                })(
                                    <Input placeholder="请输入用户名" />
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="密码">
                            {
                                getFieldDecorator('userPwd', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Input type="password" placeholder="请输入密码" />
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="性别">
                            {
                                getFieldDecorator('sex', {
                                    initialValue: '1',
                                    rules: []
                                })(
                                    <Radio.Group>
                                        <Radio value="1">男</Radio>
                                        <Radio value="2">女</Radio>
                                    </Radio.Group>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="年龄">
                            {
                                getFieldDecorator('age', {
                                    initialValue: '18',
                                    rules: []
                                })(
                                    <InputNumber />
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="当前状态">
                            {
                                getFieldDecorator('state', {
                                    initialValue: '2',
                                    rules: []
                                })(
                                    <Select>
                                        <Select.Option value="1">状态A</Select.Option>
                                        <Select.Option value="2">状态B</Select.Option>
                                        <Select.Option value="3">状态C</Select.Option>
                                        <Select.Option value="4">状态D</Select.Option>
                                        <Select.Option value="5">状态E</Select.Option>
                                        <Select.Option value="6">状态F</Select.Option>
                                        <Select.Option value="7">状态L</Select.Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="爱好">
                            {
                                getFieldDecorator('interest', {
                                    initialValue: '2',
                                    rules: []
                                })(
                                    <Select mode="multiple">
                                        <Select.Option value="1">足球</Select.Option>
                                        <Select.Option value="2">篮球</Select.Option>
                                        <Select.Option value="3">跑步</Select.Option>
                                        <Select.Option value="4">爬山</Select.Option>
                                        <Select.Option value="5">游泳</Select.Option>
                                        <Select.Option value="6">骑车</Select.Option>
                                        <Select.Option value="7">台球</Select.Option>
                                    </Select>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="是否已婚">
                            {
                                getFieldDecorator('isMarry', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: []
                                })(
                                    <Switch />
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="生日">
                            {
                                getFieldDecorator('birthday', {
                                    initialValue: moment('2018-08-08 12:00:00', 'YYYY-MM-DD HH:mm:ss'),
                                    rules: []
                                })(
                                    <DatePicker style={{ width: 300 }}
                                        showTime
                                    format="YYYY-MM-DD HH:mm:ss"
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="联系地址">
                            {
                                getFieldDecorator('address', {
                                    initialValue: '北京市海淀区',
                                    rules: []
                                })(
                                    <Input.TextArea
                                        autosize={
                                            { minRows: 3, maxRows: 8 }
                                        }
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="早起时间">
                            {
                                getFieldDecorator('time', {
                                    initialValue: moment('12:01:01','HH:mm:ss'),
                                    rules: []
                                })(
                                    <TimePicker  
                                    />
                                )
                            }
                        </Form.Item>
                        <Form.Item {...formItemLayout} label="头像">
                            {
                                getFieldDecorator('userImg', {
                                    initialValue: '',
                                    rules: []
                                })(
                                    <Upload  
                                    listType="picture-card"
                                    action="/upload/"
                                    showUploadList={false}
                                    onChange={this.handleChange}
                                    >
                                    {this.state.userImg ? <img style={{width:50}} src={this.state.userImg} /> : <Icon type="plus" />}
                                    </Upload>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            {
                                getFieldDecorator('isMarry', {
                                    valuePropName: 'checked',
                                    initialValue: true,
                                    rules: []
                                })(
                                    <Checkbox>我已经阅读过</Checkbox>
                                )
                            }
                        </Form.Item>
                        <Form.Item {...offsetLayout}>
                            <Button type="primary" onClick={this.handleSubmit}>注册</Button>
                        </Form.Item>
                        
                    </Form>
                </Card>
            </div>
        );
    }
}

export default Form.create()(Reg);