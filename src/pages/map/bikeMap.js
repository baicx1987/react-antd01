import React, { Component } from "react";
import { Card } from "antd";
import axios from "../../axios";
import BaseForm from "../../components/BaseForm";

export default class BikeMap extends Component{
    state = {
        list: [],
    }
    params = {
    }
    map = {

    }
    formList = [
        {
            type: 'CITY',
            label: '城市',
            field: 'city',
            width: 100,
        },
        {
            type: 'DATAQUERY',
            label: '订单时间',
            fields: [
                'start_time',
                'end_time'
            ]
        },
        {
            type: 'SELECT',
            label: '订单状态',
            field: 'order_status',
            placeholder: '全部',
            initialValue: '1',
            width: 100,
            list: [
                {
                    id: '0',
                    name: '全部'
                },
                {
                    id: '1',
                    name: '进行中'
                },
                {
                    id: '2',
                    name: '结束行程'
                }
            ]
        },
    ]
    handleFilter = (params) => {
        this.params = params;
        this.requestList();
    }

    componentDidMount(){
        this.requestList();
    }

    //请求接口数据
    requestList = () => {
        axios.ajax({
            url:'/map/bike_list',
            data:{
                params:this.params
            }
        }).then((res)=>{
            if (res.code == 0 && res.result){
                this.setState({
                    total_count: res.result.total_count
                })
                this.renderMap(res.result);
            }
        })
    }

    //渲染地图
    renderMap = (res)=>{
        this.map = new window.BMap.Map('container');
        //添加地图控件
        this.addMapControl();
        //绘制服务区
        this.drawServiceArea(res.service_list);
        //添加自行车坐标
        this.drawBikeIcons(res.bike_list);
        //绘制车辆路线
        this.drawBikeRoute(res.route_list);
    }
    //添加地图控件
    addMapControl = () => {
        let map = this.map;
        map.addControl(new window.BMap.ScaleControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }));
        map.addControl(new window.BMap.NavigationControl({
            anchor: window.BMAP_ANCHOR_TOP_RIGHT
        }))
    }
    //绘制车辆路线
    drawBikeRoute = (route_list)=>{
        let gps1 = route_list[0].split(',');
        let startPoint = new window.BMap.Point(gps1[0], gps1[1]);
        let gps2 = route_list[route_list.length - 1].split(',');
        let endPoint = new window.BMap.Point(gps2[0], gps2[1]);
        this.map.centerAndZoom(endPoint, 11);

        let startIcon = new window.BMap.Icon('/assets/start_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        let bikeStartMarker = new window.BMap.Marker(startPoint, { icon: startIcon });

        this.map.addOverlay(bikeStartMarker);

        let endIcon = new window.BMap.Icon('/assets/end_point.png', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });
        let bikeEndMarker = new window.BMap.Marker(endPoint, { icon: endIcon });

        this.map.addOverlay(bikeEndMarker);

        //链接路线图
        let trackPoint = [];
        route_list.forEach((item) => {
            let p = item.split(",");
            trackPoint.push(new window.BMap.Point(p[0], p[1]));
        })

        var polyline = new window.BMap.Polyline(trackPoint, {
            strokeColor: '#ef4136',
            strokeWeight: 3,
            strokeOpactiy: 1
        });
        this.map.addOverlay(polyline);
    }

    //绘制服务区
    drawServiceArea = (positionList) => {
        let trackPoint = [];
        positionList.forEach((item)=> {
            trackPoint.push(new window.BMap.Point(item.lon, item.lat));
        }) 
        var polygon = new window.BMap.Polygon(trackPoint, {
            strokeColor: '#CE0000',
            strokeWeight: 4,
            strokeOpacity: 1,
            fillColor: '#ff8605',
            fillOpacity: 0.2
        });
        this.map.addOverlay(polygon);
    }
    //绘制自行车图标
    drawBikeIcons = (bikePointList)=>{
        let bikeIcon = new window.BMap.Icon('/assets/bike.jpg', new window.BMap.Size(36, 42), {
            imageSize: new window.BMap.Size(36, 42),
            anchor: new window.BMap.Size(18, 42)
        });

        bikePointList.forEach((item)=>{
            let p = item.split(",");
            let point = new window.BMap.Point(p[0], p[1]);
            let bikeMarker = new window.BMap.Marker(point, { icon: bikeIcon });
            this.map.addOverlay(bikeMarker);
        })

        
    }

    render(){
        return (
            <div>
                <Card>
                    <BaseForm formList={this.formList} filterSubmit={this.handleFilter} />
                </Card>
                <Card style={{marginTop:10}}>
                    <div>共{this.state.total_count}辆车</div>
                    <div id="container" style={{height:500}}></div>
                </Card>
            </div>
        );
    }
}