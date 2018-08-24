import React,{ Component } from "react";
import { HashRouter,Route,Switch } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Login from "./pages/Login";
import Buttons from "./pages/ui/buttons";
import NoMatch from "./pages/nomatch";
import Modals from "./pages/ui/modals";
import Loadings from "./pages/ui/loadings";
import Notification from "./pages/ui/notification";
import Messages from "./pages/ui/messages";
import TabsPage from "./pages/ui/tabs";
import Gallery from "./pages/ui/gallery";
import CarouselPage from "./pages/ui/carousel";
import LoginPage from "./pages/form/login";
import Reg from "./pages/form/reg";
import BasicTable from "./pages/table/basic";
import HighTable from "./pages/table/high";
import City from "./pages/city";
import Order from "./pages/order";
import OrderDetail from "./pages/order/detail";
import User from "./pages/user";
import BikeMap from "./pages/map/bikeMap";
import Bar from "./pages/echarts/bar";
import Pie from "./pages/echarts/pie";
import Line from "./pages/echarts/line";
import Common from "./common";

export default class IRouter extends Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Route path="/login" component={Login}/>
                    <Route path="/admin" render={() =>
                        <Admin>
                            <Switch>
                                <Route path="/admin/ui/buttons" component={Buttons} /> 
                                <Route path="/admin/ui/modals" component={Modals} /> 
                                <Route path="/admin/ui/loadings" component={Loadings} /> 
                                <Route path="/admin/ui/notification" component={Notification} /> 
                                <Route path="/admin/ui/messages" component={Messages} /> 
                                <Route path="/admin/ui/tabs" component={TabsPage} /> 
                                <Route path="/admin/ui/gallery" component={Gallery} /> 
                                <Route path="/admin/ui/carousel" component={CarouselPage} /> 
                                <Route path="/admin/form/login" component={LoginPage} /> 
                                <Route path="/admin/form/reg" component={Reg} /> 
                                <Route path="/admin/table/basic" component={BasicTable} /> 
                                <Route path="/admin/table/high" component={HighTable} /> 
                                <Route path="/admin/city" component={City} /> 
                                <Route path="/admin/order" component={Order} /> 
                                <Route path="/admin/user" component={User} /> 
                                <Route path="/admin/bikeMap" component={BikeMap} /> 
                                <Route path="/admin/echarts/bar" component={Bar} /> 
                                <Route path="/admin/echarts/pie" component={Pie} /> 
                                <Route path="/admin/echarts/line" component={Line} /> 
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    }/>
                    <Route path="/common" render={()=>
                        <Common>
                            <Route path="/common/order/detail/:orderId" component={OrderDetail} /> 
                        </Common>
                    }/> 
                </App>
            </HashRouter>
        );
    }
}