import React,{ Component } from "react";
import { HashRouter,Route,Link,Switch } from "react-router-dom";
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
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    }/>
                </App>
            </HashRouter>
        );
    }
}