import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import "../Registration.css";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import createUser from "../actions/userAction";

class PopupRegistration extends Component {
    constructor(){
        super()
        this.state={
            "username":"",
            "email": "",
            "password": ""
        };
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
       
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});
    }
    onSubmit(e){
        e.preventDefault();
        const newuser={
        "username":this.state.username,
        "email": this.state.email,
        "password": this.state.password
        }
        this.props.createUser(newuser,this.props.history);
    }
    
    render() {
        return (
            <div className="container">
               < div className="row">
                    <div className="col-lg-10 col-xl-9 mx-auto">
                        <div className="card card-signin flex-row">
                             <div className="card-img-left d-none d-md-flex">
                            </div>
                            <div className="card-body">
                                <h5 className="card-title text-center">Register</h5>
                                    <form  className="form-signin" onSubmit={this.onSubmit}>
                                        <div className="form-label-group">
                                            <input name ="username" type="text" id="inputUserame" className="form-control" placeholder="Username" required autoFocus
                                                value={this.state.username}
                                                onChange={this.onChange}
                                            />
                                            <label htmlFor="inputUserame">Username</label>
                                         </div>

                                        <div className="form-label-group">
                                            <input name ="email" type="email" id="inputEmail" 
                                            className="form-control" placeholder="Email address" required
                                            value={this.state.email}
                                            onChange={this.onChange}
                                            />
                                            <label htmlFor="inputEmail">Email address</label>
                                        </div>
              
                                        <hr />

                                         <div className="form-label-group">
                                            <input name ="password" 
                                            type="password" id="inputPassword" className="form-control" placeholder="Password" required
                                            value={this.state.password}
                                            onChange={this.onChange}
                                             />
                                            <label htmlFor="inputPassword">Password</label>
                                        </div>
                                        {/*
                                        <div className="form-label-group">
                                            <input name ="re-password" type="password" id="inputConfirmPassword" className="form-control" placeholder="Password" required />
                                            <label htmlFor="inputConfirmPassword">Confirm password</label>
                                        </div>
                                        */}
                                        
                                        <button className="btn btn-lg btn-primary btn-block text-uppercase" type="submit">Register</button>
    
                                        <hr className="my-4" />
                                        <button className="btn btn-lg btn-google btn-block text-uppercase" type="submit"><i className="fab fa-google mr-2"></i> Sign up with Google</button>
                                        <button className="btn btn-lg btn-facebook btn-block text-uppercase" type="submit"><i className="fab fa-facebook-f mr-2"></i> Sign up with Facebook</button>
                                    </form>
                                    <div>
                                        <button className="btn btn-info mt-4" onClick={this.props.closePopup}>Back</button>
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
PopupRegistration.propTypes={
    createUser : PropTypes.func.isRequired,
}
export default connect(null,{ createUser })(PopupRegistration) ;