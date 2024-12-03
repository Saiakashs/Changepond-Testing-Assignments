import React, {Component} from "react";

class CounterComp extends Component{

    constructor(){
        super();
        this.state={
            count:0
        }
    }

    increment = () =>{
        this.setState((prevState)=>({count:prevState.count+1}));
        console.log(this.state.count);
    }

    decrement = () =>{
            this.setState((prevState)=>({count:prevState.count-1}));
    }

    reset = () =>{
        this.setState((prevState)=>({count:prevState.count=0}));
    }

    

    render(){
        return (
            <div>
                <h2> This is State Component</h2>
                <p>Count:<strong>{this.state.count}</strong></p> <br></br>
                <button type="button" id="b1" className="btn btn-outline-primary" onClick={()=>this.increment()}>Count++</button>
                <button type="button" className="btn btn-outline-primary" onClick={()=>this.decrement()}>Count--</button>
                <button type="reset" className="btn btn-outline-primary" onClick={()=>this.reset()}>Reset</button>
            </div>
        )
    }
}

export default CounterComp;