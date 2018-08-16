import React, { Component } from "react";
import { Card, Carousel} from "antd";
import "./ui.less";

export default class CarouselPage extends Component {
    state = {
    }
    onChange = (a, b, c) => {
        console.log(a, b, c);
    }
    render() {
        return (
            <div>
                <Card title="文字轮播" className="card-warp">
                    <Carousel autoplay={true} effect="fade" afterChange={this.onChange}>
                        <div><h3>1</h3></div>
                        <div><h3>2</h3></div>
                        <div><h3>3</h3></div>
                        <div><h3>4</h3></div>
                    </Carousel>
                </Card>
                <Card title="图片轮播" className="slider-warp">
                    <Carousel autoplay={true} effect="fade" >
                        <div>
                            <img src="/carousel-img/carousel-1.jpg" alt=""/>
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-2.jpg" alt="" />
                        </div>
                        <div>
                            <img src="/carousel-img/carousel-3.jpg" alt="" />
                        </div>
                    </Carousel>
                </Card>
           </div>
        );
    }
}