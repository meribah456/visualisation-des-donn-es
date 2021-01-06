import React, { Component } from 'react'
import $ from 'jquery';

import '@fortawesome/fontawesome-free/css/all.min.css';

import './dark-mode.css';
import 'mdbreact/dist/css/mdb.css'
import 'mdbreact/dist/css/style.css'
import {connect} from "react-redux";
import checkLogInInfo from "../actions/checkLogInInfo";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

class Navbar extends Component {
  componentWillMount(e){
        this.props.checkLogInInfo(localStorage.getItem("authToken"),this.props.history).then((val)=>{
          var authToken = localStorage.getItem("authToken")

            if(val.status!==200 && localStorage.getItem("authToken")){
                this.props.history.push('/');
                localStorage.removeItem("authToken")
                localStorage.removeItem("username")
            }
        });
    }
    render() {
      
      if(localStorage.getItem("username")){
        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
        

        <button onClick={(e)=>{$("#wrapper").toggleClass("toggled");}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <div className="list-group-item list-group-item-dark mt-1"><a href="/">Welcome: <i>{localStorage.getItem("username")}</i></a></div>
            </li>
            <li className="nav-item active">
              <a className="nav-link btn btn-default" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
        )
      }else{
        //var authToken = this.props.userInfo['headers']['authorization']
        //var username = JSON.parse(this.props.userInfo['config']['data'])['username'];
        return (
                <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        

        <button onClick={(e)=>{$("#wrapper").toggleClass("toggled");}} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
            <li className="nav-item">
              <a className="nav-link btn btn-default" href="/">Home <span className="sr-only">(current)</span></a>
            </li>
          </ul>
        </div>
      </nav>
        )
      }

    }
}
Navbar.propTypes={
    checkLogInInfo : PropTypes.func.isRequired,
}
export default withRouter(connect(null,{ checkLogInInfo })(Navbar));
