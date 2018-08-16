import React, { Component } from "react";
import { Card, Row, Col,Modal} from "antd";
import "./ui.less";

export default class Gallery extends Component {
    state = {
        visible:false
    }
    handleOpenImg = (currentImg) => {
        this.setState({
            visible:true,
            currentImg
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
        });
    }
    render() {
        const imgs = [
            ['1.png', '2.png', '3.png', '4.png', '5.png'],
            ['6.png', '7.png', '8.png', '9.png', '10.png'],
            ['11.png', '12.png', '13.png', '14.png', '15.png'],
            ['16.png', '17.png', '18.png', '19.png', '20.png'],
            ['21.png', '22.png', '23.png', '24.png', '25.png'],
        ]
        const imgList = imgs.map((list,i) => list.map((item,j) =>
            <Card style={{marginBottom:10}}
                hoverable
                cover={<img alt="example" onClick={() => this.handleOpenImg('/gallery/' +item)} src={'/gallery/'+item} />}
            >
                <Card.Meta
                    title={'图片'+i+j}
                    description={'路径'+item}
                />
            </Card>
        ));
        return (
            <div className="card-warp">
               <Row gutter={10}>
                    <Col md={4}>
                        {imgList[0]}
                    </Col>
                    <Col md={5}>
                        {imgList[1]}
                    </Col>
                    <Col md={5}>
                        {imgList[2]}
                    </Col>
                    <Col md={5}>
                        {imgList[3]}
                    </Col>
                    <Col md={5}>
                        {imgList[4]}
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={4}>
                        {imgList[5]}
                    </Col>
                    <Col md={5}>
                        {imgList[6]}
                    </Col>
                    <Col md={5}>
                        {imgList[7]}
                    </Col>
                    <Col md={5}>
                        {imgList[8]}
                    </Col>
                    <Col md={5}>
                        {imgList[9]}
                    </Col>
                </Row>
             
                <Row gutter={10}>
                    <Col md={4}>
                        {imgList[10]}
                    </Col>
                    <Col md={5}>
                        {imgList[11]}
                    </Col>
                    <Col md={5}>
                        {imgList[12]}
                    </Col>
                    <Col md={5}>
                        {imgList[13]}
                    </Col>
                    <Col md={5}>
                        {imgList[14]}
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={4}>
                        {imgList[15]}
                    </Col>
                    <Col md={5}>
                        {imgList[16]}
                    </Col>
                    <Col md={5}>
                        {imgList[17]}
                    </Col>
                    <Col md={5}>
                        {imgList[18]}
                    </Col>
                    <Col md={5}>
                        {imgList[19]}
                    </Col>
                </Row>
                <Row gutter={10}>
                    <Col md={4}>
                        {imgList[20]}
                    </Col>
                    <Col md={5}>
                        {imgList[21]}
                    </Col>
                    <Col md={5}>
                        {imgList[22]}
                    </Col>
                    <Col md={5}>
                        {imgList[23]}
                    </Col>
                    <Col md={5}>
                        {imgList[24]}
                    </Col>
                </Row>
                <Modal 
                    visible={this.state.visible}
                    onCancel={this.handleCancel}
                    footer={null}
                    title={'图片画廊'}
                >
                    <img style={{width:400}} src={this.state.currentImg} alt=""/>
                </Modal>
           </div>
        );
    }
}