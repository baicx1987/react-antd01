import React,{ Component } from "react";
import { HashRouter,Route,Link,Switch } from "react-router-dom";
import Main from "./Main";
import About from "./About";
import Topics from "./Topics";
import Error from "./404";

export default class Home extends Component{
    render(){
        return (
            <HashRouter>
                <div>
                    <ul>
                        <li><Link to="/">Main</Link></li>
                        <li><Link to="/about">About</Link></li>
                        <li><Link to="/topics">Topics</Link></li>
                        <li><Link to="/bcx">bcx</Link></li>
                    </ul>
                    <hr/>
                    <Switch>
                        <Route exact={true} path="/" component={Main}></Route>
                        <Route exact={true} path="/About" component={About}></Route>
                        <Route exact={true} path="/Topics" component={Topics}></Route>
                        <Route component={Error}></Route>
                    </Switch>
                </div>
            </HashRouter> 
        );
    }
}