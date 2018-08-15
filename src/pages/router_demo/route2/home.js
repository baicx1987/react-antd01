import React, { Component } from "react";
import { HashRouter, Route, Link, Switch } from "react-router-dom";


export default class Home extends Component {
    render() {
        return (
                <div>
                    <ul>
                        <li><Link to="/main">Main2</Link></li>
                        <li><Link to="/about">About2</Link></li>
                        <li><Link to="/topics">Topics2</Link></li>
                        <li><Link to="/bcx">bcx</Link></li>
                    </ul>
                    <hr/>
                    {this.props.children}
                </div>
        );
    }
}