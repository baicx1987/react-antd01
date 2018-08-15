import React,{ Component } from "react";
import { Link } from "react-router-dom";

export default class Main extends Component{
    render(){
        return (
           <div>
               <Link to="/main/a">aaaa</Link>
               <hr/>
               {this.props.children}
           </div>
        );
    }
}