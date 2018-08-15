import React,{ Component } from "react";
import { HashRouter,Route,Link,Switch } from "react-router-dom";
import App from "./App";
import Admin from "./admin";
import Login from "./pages/Login";
import Buttons from "./pages/ui/buttons";
import NoMatch from "./pages/nomatch";

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
                                <Route component={NoMatch} />
                            </Switch>
                        </Admin>
                    }/>
                </App>
            </HashRouter>
        );
    }
}