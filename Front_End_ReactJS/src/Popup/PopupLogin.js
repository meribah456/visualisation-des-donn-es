import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../Login.css';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import sendLogInInfo from "../actions/loginAction";
import { withRouter } from 'react-router-dom';
class PopupLogin extends React.Component {
    constructor(){
        super()
        this.state={
            "email":"",
            "password":"",
            "userInfo":"."
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);

    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const login={
        "email": this.state.email,
        "password": this.state.password
        }
        this.props.sendLogInInfo(login,this.props.history).then((val)=>{
            this.setState({userInfo:val});
            this.props.parentCallback(this.state.userInfo);
            this.props.history.push('/visualization');
        });
    }
    

    
    render() {
      return (
        <div className="container">
            <div className="row">
                <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
                    <div className="card popup">
                        <div className="popup_inner">
                            <h5 className="card-title text-center text-primary">Log In</h5>
                            <form onSubmit={this.onSubmit}> 
                                <div className="form-label-group">
                                    <input value={this.state.email} onChange={this.onChange} name ="email" type="text" id="inputEmail" className="form-control" placeholder="Email address" required autoFocus/>
                                    <label htmlFor="inputEmail">Email address</label>
                                </div>
                                 <div className="form-label-group">
                                    <input value={this.state.password} onChange={this.onChange} name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
                                    <label htmlFor="inputPassword">Password</label>
                                </div>
                                <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Sign in</button>
                                <hr className="my-4" />
                                <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign in with Google</button>
                                <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign in with Facebook</button>
                            </form>
                            <div>
                                <button className="btn btn-info mt-4" onClick={this.props.closePopup}>Back</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        );
    }
  } 
PopupLogin.propTypes={
    sendLogInInfo : PropTypes.func.isRequired,
}
export default withRouter(connect(null,{ sendLogInInfo })(PopupLogin));
