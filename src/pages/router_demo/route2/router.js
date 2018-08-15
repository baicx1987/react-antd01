import React,{ Component } from "react";
import { HashRouter,Route,Link,Switch } from "react-router-dom";
import Main from "../route1/Main";
import About from "../route1/About";
import Topics from "../route1/Topics";
import Error from "../route1/404";
import Home from "./home";

export default class IRouter extends Component{
    render(){
        return (
            <HashRouter>
                <Home>
                    <Switch>
                        <Route path="/main" component={() => {
                            return (<Main>
                                <div>this is submint</div>
                                <Route exact={true} path="/main/a" component={About}></Route>  
                            </Main>);
                        }}></Route>
                        <Route exact={true} path="/About" component={About}></Route>
                        <Route exact={true} path="/Topics" component={Topics}></Route>
                        <Route component={Error}></Route>
                    </Switch>
                </Home>
            </HashRouter>
        );
    }
}