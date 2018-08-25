import React, { Component } from "react";
import { Card, Button,Modal} from "antd";
import { Editor } from 'react-draft-wysiwyg';
import draftjs from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';

export default class RichText extends Component {
    
    state = {
        showRichText:false,
        editorState:''
    }

    onEditorStateChange = (editorState)=>{
        this.setState({
            editorState
        });
    }

    onContentStateChange = (contentState)=>{
        this.setState({
            contentState
        });
    }

    handleClearContent = ()=>{
        this.setState({
            editorState:''
        });
    }

    handleGetText = ()=>{
        this.setState({
            showRichText: true
        });
    }

    render(){
        const { editorState } = this.state;
        return (
            <div>
                <Card>
                    <Button style={{marginRight:10}} type="primary" onClick={this.handleClearContent}>清空内容</Button>
                    <Button type="dashed" onClick={this.handleGetText}>获取HTML文本</Button>
                </Card>
                <Card title="富文本编辑器">
                    <Editor
                        editorState={editorState}
                        onEditorStateChange={this.onEditorStateChange}
                        onContentStateChange={this.onContentStateChange}
                    />

                </Card>
                <Modal
                    title="富文本"
                    visible={this.state.showRichText}
                    footer={false}
                    onCancel={()=>{
                        this.setState({
                            showRichText: false
                        })
                    }}
                >
                    {draftjs(this.state.contentState)}
                </Modal>
            </div>
        );
    }
}