import React, { Component } from 'react'
import './User.css'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import EditUserInfo from "../actions/EditUserInfo";
import { withRouter } from 'react-router-dom';
class EditUser extends Component {
    constructor(){
        super()
        this.state={
            RecentPassword:"",
            NewPassword:"",
            VerifyPassword:"",
            statut :"",
        }
        this.onChange=this.onChange.bind(this);
        this.onSubmit=this.onSubmit.bind(this);
      
    }
    onChange(e){
        this.setState({[e.target.name]:e.target.value});

    }
    onSubmit(e){
        e.preventDefault();
        const Demande={
        "RecentPassword": this.state.RecentPassword,
        "NewPassword": this.state.NewPassword
        }
        this.props.EditUserInfo(Demande,this.props.history).then((val)=>{
            this.setState({statut:val['data']});
            document.getElementById('alert').classList.remove('hidden');
        });
    }
  
    render() {
        return (
            <div id="User" >
                <div class="alert alert-dark hidden col-6" id='alert' role="alert">
                {this.state.statut}
                </div>
                <form>
                    <div className="col-6">
                <div class="md-form">
                    <input placeholder="RecentPassword"value={this.state.RecentPassword} onChange={this.onChange} type="password" id="form1" class="form-control" name ="RecentPassword"/>
                </div>
                </div>                
                <div className="col-6">
                <div class="md-form">
                
                    <input placeholder="NewPassword" value={this.state.NewPassword} onChange={this.onChange} type="password" id="form1" class="form-control" name ="NewPassword"/>
                   
                </div>
                </div> 
                <div className="col-6">
                <div class="md-form">
                
                    <input placeholder="VerifyPassword" value={this.state.VerifyPassword} onChange={this.onChange} type="password" id="form1" class="form-control" name ="VerifyPassword"/>
                   
                </div>
                <div>
                                <button onClick={this.onSubmit} className="btn btn-info mt-4">Update creds.</button>
                            </div>
                            
                </div> 
                </form>
                <div class="alert alert-dark hidden col-6" id='alert' role="alert">
                
                </div>
                </div>
            
        )
    }
}
EditUser.propTypes={
    EditUserInfo : PropTypes.func.isRequired,
}
export default withRouter(connect(null,{ EditUserInfo })(EditUser));