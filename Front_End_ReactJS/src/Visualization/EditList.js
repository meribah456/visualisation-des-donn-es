import React, { Component } from 'react'
import PropTypes from "prop-types";
import {connect} from "react-redux";
import sendLabelEncoder from "../actions/sendLabelEncoder";
import { withRouter } from 'react-router-dom';
import axios from 'axios';
class EditList extends Component {
    constructor(props){
        super(props)
        this.state = { 
            editType:0,
            file:null,
            columns:[],
            columnName:null,
            yAx:null
        }
        this.EditHandler=this.EditHandler.bind(this)
        this.LabelEncoderHandler=this.LabelEncoderHandler.bind(this)
        this.MeanHandler=this.MeanHandler.bind(this)
        this.MedianHandler=this.MedianHandler.bind(this)
        this.StandardScalerHandler=this.StandardScalerHandler.bind(this)
    }
    
    EditHandler(e){
      this.setState({
        columnName:e.target.value
      })
        
    }
    EditHandleryAx(e){
      this.setState({
        yAx:e.target.value
      })
        
    }
    LabelEncoderHandler(){
        this.props.sendLabelEncoder(this.state.columnName,this.props.fileId).then((val)=>{})
    }
    async MeanHandler(){
      var authToken = localStorage.getItem("authToken");
      Promise.resolve(await axios.post('/FillNaNMean','columnName='+this.state.columnName+'&fileIdString='+this.props.fileId,{headers: {'Authorization': authToken, 'Content-Type': 'application/x-www-form-urlencoded',}}));
  }
  async MedianHandler(){
    var authToken = localStorage.getItem("authToken");
      Promise.resolve(await axios.post('/FillNaNMedian','columnName='+this.state.columnName+'&fileIdString='+this.props.fileId,{headers: {'Authorization': authToken, 'Content-Type': 'application/x-www-form-urlencoded',}}));
  }
  async StandardScalerHandler(){
    var authToken = localStorage.getItem("authToken");
      Promise.resolve(await axios.post('/StandardScaler','xAx='+this.state.columnName+'&yAx='+this.state.yAx+'&fileIdString='+this.props.fileId,{headers: {'Authorization': authToken, 'Content-Type': 'application/x-www-form-urlencoded',}}));
  }

    render() {
        const items = Object.values(this.props.columns);
        items.sort();
        if(this.state.editType===0){
        return (
            <div>
<div className="row ml-3 mt-2 col-11">
<div className="card card-cascade wider special-color col-3" onClick={this.LabelEncoderHandler}>

  <div className="view view-cascade overlay mt-2">
    <a href="#!">
    <button className="btn btn-default" >Label Encoder</button>
      <div className="mask rgba-white-slight"></div>
    </a>
  </div>

  
  <div className="card-body card-body-cascade text-center">


  </div>
</div>
<div className="card card-cascade wider special-color col-3 ml-4" onClick={this.MeanHandler}>
  <div className="view view-cascade overlay mt-2">
    <button className="btn btn-default" onClick={()=>this.setState({plotType:1})}>Mean</button>
    <a href="#!">
      <div className="mask rgba-white-slight"></div>
    </a>
  </div>
</div>
<br/><br/><br/>
<div className="row ml-3 mt-2 col-11">
  
  <div className="card-body card-body-cascade text-center">

    <h6 className="blue-text pb-2"><strong></strong></h6>

  </div>
</div>

<div className="card card-cascade wider special-color col-3"  onClick={this.MedianHandler}>
  <div className="view view-cascade overlay mt-2">
    <button className="btn btn-default" onClick={()=>this.setState({plotType:1})}>Median</button>
    <a href="#!">
      <div className="mask rgba-white-slight"></div>
    </a>
  </div>

  
  <div className="card-body card-body-cascade text-center">

    <h6 className="blue-text pb-2"><strong></strong></h6>

  </div>
</div>

<div className="card card-cascade wider special-color ml-4 col-3"  onClick={this.StandardScalerHandler}>
  <div className="view view-cascade overlay mt-2">
    <button className="btn btn-default" onClick={()=>this.setState({plotType:1})}>Standard Scaler</button>
    <a href="#!">
      <div className="mask rgba-white-slight"></div>
    </a>
  </div>

  
  <div className="card-body card-body-cascade text-center">

    <h6 className="blue-text pb-2"><strong></strong></h6>

  </div>
</div>

  
  <div className="card-body card-body-cascade text-center">

    <h6 className="blue-text pb-2"><strong></strong></h6>

  </div>
</div>

<br/><br/><br/>
<div className="row ml-3 col-11">
    <select className="form-control col-3" onChange={(e)=>this.EditHandler(e)}>
  <option defaultValue="" disabled selected>Select a column to edit</option>
{items.map((value) => { 
    return (
        <option key={value} defaultValue={value}>{value}</option>)
            
})}
</select>

<select className="form-control col-3" onChange={(e)=>this.EditHandleryAx(e)}>
  <option defaultValue="" disabled selected>Select a column for scaling</option>
{items.map((value) => { 
    return (
        <option key={value} defaultValue={value}>{value}</option>)
            
})}
</select>
</div>
</div>

        )}else{
        
        }

        
    
    }
}

EditList.propTypes={
  sendLabelEncoder : PropTypes.func.isRequired,
}
export default withRouter(connect(null,{ sendLabelEncoder })(EditList));
