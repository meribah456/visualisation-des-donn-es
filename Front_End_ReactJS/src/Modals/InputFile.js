import React, { Component } from 'react'
import FormControl from './FormControl';
import'./modal.css';
import 'mdbreact/dist/css/mdb.css';
import 'mdbreact/dist/css/style.css';
import './mdb-file-upload.min.js';
import './uploadBox.css';

import $ from 'jquery';
import './all.css';

import PropTypes from "prop-types";
import {connect} from "react-redux";
import sendFile from "../actions/fileAction";

class InputFile extends Component {
   
    
    constructor(props) {
        super(props);
        this.state={
          file:null,
          upload:false,
        };
        this.handleFile=this.handleFile.bind(this);
        this.handleUpload=this.handleUpload.bind(this);


      }   
      handleFile(e){
        let file = e.target.files[0];
        this.setState({file:file})
        this.props.parentCallback(this.state.file);
        //console.log(localStorage.getItem("files").map(item => (console.log(item))));
        //console.log(localStorage.getItem("filesContent").map(item => (console.log(item))));
        //document.getElementById("filenameLabel").innerHTML=file['name'];
      }
      handleUpload(e){
        e.preventDefault();
        let file=this.state.file
        let formdata = new FormData()
        formdata.append('file',file);
        this.props.sendFile(file,this.props.history,formdata);
        document.getElementById("uploadForm").reset();
        document.getElementById("fileStateContainer").classList.remove("d-none");
        document.getElementById("fileStateLabel").innerHTML="<b>File : <i>"+file['name']+"</i> has been uploaded successfully.</b>";
        this.setState({upload:!this.state.upload},()=>this.props.parentCallback1(this.state.upload))

      }
      render() {
        
        return(
          <form className="form"action="#" id="uploadForm">   
              <div className="form-group files">
                <input type="file" className="form-control" onChange={(e)=>this.handleFile(e)}/>
              </div>
              <div className="form-group">
                <input type="submit" id="submit" className="form-control btn btn-primary col-2 p-2" onClick={(e)=>this.handleUpload(e)} />
              </div>
              <div className="alert alert-success d-none" role="alert" id="fileStateContainer">
                <label id="fileStateLabel"></label>
              </div>
          </form>
          )
    }
}
InputFile.propTypes={
  sendFile : PropTypes.func.isRequired,
}
export default connect(null,{ sendFile })(InputFile) ;



