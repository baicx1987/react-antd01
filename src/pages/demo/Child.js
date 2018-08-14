import React,{ Component } from "react";

export default class Child extends Component {
    constructor(){
        super();
        this.state ={
            count: 0
        };
    }
    componentWillMount(){
        console.log("child -- componentWillMount");
    }

    componentDidMount() {
        console.log("child -- componentDidMount");
    }

    componentWillReceiveProps(newProps){
         console.log("child -- componentWillReceiveProps",newProps);
    }

    shouldComponentUpdate(){
        console.log("child -- shouldComponentUpdate");
        return true;
    }

    componentWillUpdate(){
        console.log("child -- componentWillUpdate");
    }

    componentDidUpdate(){
        console.log("child -- componentDidUpdate");
    }
    

    render(){
        console.log("child -render");
        return <div style={{padding:"20px"}}>
            <p>这里是子组件</p>
            <p>{this.props.name}</p>
        </div>;
    }
}