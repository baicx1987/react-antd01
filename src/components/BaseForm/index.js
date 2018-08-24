import React, { Component } from "react";
import { Card, Form, message, Input, Button, Checkbox, Radio, Select, DatePicker } from "antd";
import utils from "../../utils/utils";
const FormItem = Form.Item;


class FilterForm extends Component {
    initFormList = () => {
        const { getFieldDecorator } = this.props.form;
        const formList = this.props.formList;
        const formItemList = [];
        if (formList && formList.length) {
            formList.forEach((item, i) => {
                let label = item.label;
                let field = item.field;
                let fields = item.fields || ['start_time','end_time'];
                let initialValue = item.initialValue || '';
                let placeholder = item.placeholder;
                let width = item.width;
                if (item.type === 'INPUT') {
                    const INPUT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue
                            })(
                                <Input type="text"
                                    placeholder={placeholder}
                                ></Input>
                            )
                        }
                    </FormItem>;
                    formItemList.push(INPUT);
                } else if (item.type === 'SELECT') {
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue
                            })(
                                <Select
                                    style={{ width }}
                                    placeholder={placeholder}
                                >
                                    {utils.getOptionList(item.list)}
                                </Select>
                            )                 
                        }
                    </FormItem>;
                    formItemList.push(SELECT);
                } else if (item.type === 'CEHCKBOX') {
                    const CEHCKBOX = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue
                            })(
                                <Checkbox>
                                    {label}
                                </Checkbox>
                            )
                        }
                    </FormItem>;
                    formItemList.push(CEHCKBOX);
                } else if (item.type === 'DATAPICKER') {
                    const DATAPICKER = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field)(
                                <DatePicker showTime={true}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder={placeholder}
                                ></DatePicker>
                            )
                        }

                    </FormItem>;
                    formItemList.push(DATAPICKER);
                }else if (item.type === 'DATAQUERY') {
                    const begin_time = <FormItem label={label} key={fields[0]}>
                        {
                            getFieldDecorator(fields[0])(
                                <DatePicker showTime={true}
                                    format="YYYY-MM-DD HH:mm:ss"
                                    placeholder={placeholder}
                                ></DatePicker>
                            )
                        }

                    </FormItem>;
                    formItemList.push(begin_time);
                    const end_time = <FormItem label="~" colon={false} key={fields[1]}>
                        {
                            getFieldDecorator(fields[1])(
                                <DatePicker
                                    placeholder={placeholder}
                                    showTime={true}
                                    format="YYYY-MM-DD HH:mm:ss"></DatePicker>
                            )
                        }
                    </FormItem>
                    formItemList.push(end_time);
                } else if (item.type === 'CITY') {
                    const cityList = [
                        {
                            id: '0',
                            name: '全部'
                        },
                        {
                            id: '1',
                            name: '北京'
                        },
                        {
                            id: '2',
                            name: '上海'
                        },
                        {
                            id: '3',
                            name: '天津'
                        }
                    ];
                    const SELECT = <FormItem label={label} key={field}>
                        {
                            getFieldDecorator(field, {
                                initialValue:'0'
                            })(
                                <Select
                                    style={{ width }}
                                    placeholder={placeholder}
                                >
                                {utils.getOptionList(cityList)}
                                </Select>
                            )
                        }
                    </FormItem>;
                    formItemList.push(SELECT);
                }
            })
        }
        return formItemList;
    }
    handleFilterSubmit = () => {
        let fieldsValue = this.props.form.getFieldsValue();
        this.props.filterSubmit(fieldsValue);
    }
    reset = ()=>{
        this.props.form.resetFields();
    }
    render() {
        return (
            <Form layout="inline">
                {this.initFormList()}
                <Form.Item>
                    <Button type="primary" style={{ margin: '0 20px' }} onClick={this.handleFilterSubmit}>查询</Button>
                    <Button onClick={this.reset}>重置</Button>
                </Form.Item>
            </Form>

        );
    }
}

export default Form.create({})(FilterForm);