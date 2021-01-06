import React, { Component } from 'react'
import "../Welcome.css";
import Buttons from './Buttons';
import Animation from './Animation'
import './Logo.css'
class Welcome extends Component {
    componentDidMount(){
        Animation();
    }
    render() {
        return (
            <div className="databackground">
                    <div className="row">
                        <div id="animation" className="col-6"/>  
                    
                    <div className="col-6">
                        <h1 id="text">The easiest way to visualize data</h1>
                        <br/>
                        <p id="text1">You want try , First Sing up for a free account</p>
                        <div className="VisualizeButton ">
                            <Buttons />
                        </div>
                        
                    </div>
                    </div>
                </div>

                
           
        );
    }
}
export default Welcome;
