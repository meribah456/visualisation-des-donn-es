import React, { Component } from 'react'
import PopupLogin from '../Popup/PopupLogin';
import PopupRegistration from '../Popup/PopupRegistration';
import {connect} from "react-redux";
import checkLogInInfo from "../actions/checkLogInInfo";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";
import './Logo.css'
class Navbar extends Component {
    state = { 
        userInfo: "." 
    }
    CallBackFunction = (childData) => {
      this.setState({userInfo: childData})
      this.props.parentCallback(this.state.userInfo);
}
    constructor(props) {
        super();
        this.togglePopupLogin=this.togglePopupLogin.bind(this);
        this.togglePopupRegistration=this.togglePopupRegistration.bind(this);
        this.state = {
          showPopupLogin: false ,
          showPopupRegistration :false,
          authResponse:0,
        };
      }
      togglePopupLogin() {
        this.setState({
          showPopupLogin:!this.state.showPopupLogin,
          showPopupRegistration:false
        });
      }
      togglePopupRegistration() {
        this.setState({
          showPopupRegistration:!this.state.showPopupRegistration,
          showPopupLogin:false
        });
      }
      LogOutHandler(){
        localStorage.removeItem("username");
        localStorage.removeItem("authToken");
        window.location.href="/";
      }
      componentDidMount(e){
        this.props.checkLogInInfo(localStorage.getItem("authToken"),this.props.history).then((val)=>{
            if(val.status){
              this.setState({authResponse:val.status});  
            }else{
              this.setState({authResponse:val.response.status});
            }
            if(val.status===200){
                //this.props.history.push('/visualization');
            }else{
                localStorage.removeItem("authToken")
                localStorage.removeItem("username")
            }
        });
      }
    render() {
      if (this.state.authResponse===403) {
        return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand mb-1" id="Logo" href="/" >VISPRO</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav navbar-nav">
                        <li className="nav-item active">
                            <h1 className="ml-4" id="welcome">Welcome to <span id="text2">VISPRO</span> </h1>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto">   
                        <li className="nav-item">
                            <button className="btn dark-mode-text-hover"  onClick={this.togglePopupLogin}>Log In</button>
                        </li>
                        <li className="nav-item">
                            <button className="btn dark-mode-text-hover" onClick={this.togglePopupRegistration}>Sign Up</button>
                        </li>
                    </ul>
                </div>
            </nav>
            {this.state.showPopupLogin ? 
            <PopupLogin parentCallback={this.CallBackFunction} 
            closePopup={this.togglePopupLogin.bind(this)}
            />
            :null
            }
            {this.state.showPopupRegistration ? 
            <PopupRegistration
            closePopup={this.togglePopupRegistration.bind(this)}
            />
            :null
            }
            </div>
        );
      }else{
        return (
            <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand mb-1" id="Logo" href="/" >VISPRO</a>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="nav navbar-nav">
                        <li className="nav-item active">
                            <h1 className="ml-4" id="welcome">Welcome to <span id="text2">VISPRO</span> </h1>
                        </li>
                    </ul>
                    <ul className="nav navbar-nav ml-auto">   
                        <li className="nav-item">
                            <button className="btn text-danger dark-mode-text-hover" onClick={this.LogOutHandler}>Log Out</button>
                        </li>
                    </ul>
                </div>
            </nav>
            </div>
        );
      }
    }
}
Navbar.propTypes={
    checkLogInInfo : PropTypes.func.isRequired,
}
export default withRouter(connect(null,{ checkLogInInfo })(Navbar));
