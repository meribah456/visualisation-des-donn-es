import React, { Component } from 'react'
import Navbar from './Navbar';
import Welcome from './Welcome';
import Footer from './Footer';
import {connect} from "react-redux";
import checkLogInInfo from "../actions/checkLogInInfo";
import { withRouter } from 'react-router-dom';
import PropTypes from "prop-types";

class FirstPage extends Component {
	state = { 
        userInfo: "" 
    }
    callbackFunction = (childData) => {
      this.setState({userInfo: childData})
      this.props.parentCallback(this.state.userInfo);
    }
    render() {

        
        return (
            <div>
                <Navbar parentCallback={this.callbackFunction}/>
                <Welcome/>
                <Footer />
            </div>

        )
    }
}
FirstPage.propTypes={
    checkLogInInfo : PropTypes.func.isRequired,
}
export default withRouter(connect(null,{ checkLogInInfo })(FirstPage));
