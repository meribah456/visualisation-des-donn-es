import React, { Component } from 'react';
import "./loader.css";
class Loading extends Component {
    componentDidMount () {
        window.setTimeout(function(){window.location.href = "/visualization" }, 1000);
    }
    render() {
        return (
            <div className="style">
                <div className="loader"></div>      
            </div>
        )
    }
}
export default Loading;