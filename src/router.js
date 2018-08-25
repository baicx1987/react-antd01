import React,{ Component } from "react";
import { HashRouter,Route,Switch,Redirect} from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Home from "./pages/home";
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
import RichText from "./pages/richText";
import PermissionUser from "./pages/permission";
import Common from "./common";

export default class IRouter extends Component{
    render(){
        return (
            <HashRouter>
                <App>
                    <Switch>
                        <Route path="/login" component={Login}/>
                        <Route path="/common" render={() =>
                            <Common>
                                <Route path="/common/order/detail/:orderId" component={OrderDetail} />
                            </Common>
                        } /> 
                        <Route path="/" render={() =>
                            <Admin>
                                <Switch>       
                                    <Route path="/home" component={Home} /> 
                                    <Route path="/ui/buttons" component={Buttons} /> 
                                    <Route path="/ui/modals" component={Modals} /> 
                                    <Route path="/ui/loadings" component={Loadings} /> 
                                    <Route path="/ui/notification" component={Notification} /> 
                                    <Route path="/ui/messages" component={Messages} /> 
                                    <Route path="/ui/tabs" component={TabsPage} /> 
                                    <Route path="/ui/gallery" component={Gallery} /> 
                                    <Route path="/ui/carousel" component={CarouselPage} /> 
                                    <Route path="/form/login" component={LoginPage} /> 
                                    <Route path="/form/reg" component={Reg} /> 
                                    <Route path="/table/basic" component={BasicTable} /> 
                                    <Route path="/table/high" component={HighTable} /> 
                                    <Route path="/city" component={City} /> 
                                    <Route path="/order" component={Order} /> 
                                    <Route path="/user" component={User} /> 
                                    <Route path="/bikeMap" component={BikeMap} /> 
                                    <Route path="/echarts/bar" component={Bar} /> 
                                    <Route path="/echarts/pie" component={Pie} /> 
                                    <Route path="/echarts/line" component={Line} /> 
                                    <Route path="/rich" component={RichText} /> 
                                    <Route path="/permission" component={PermissionUser} /> 
                                    <Redirect to="/home" />
                                    <Route component={NoMatch} />
                                </Switch>
                            </Admin>
                        }/>
                    </Switch>
                </App>
            </HashRouter>
        );
    }
}