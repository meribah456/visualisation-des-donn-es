import React, { Component } from 'react'
import InputFile from './InputFile';

class UploadModal extends Component {
   
    
    constructor(props) {
        super(props);
        this.state={
          file:null,
          upload:false,
        };
      }
    callbackFunction = (childData) => {
        this.setState({file: childData});
        this.props.parentCallback1(childData);
    }
    callbackFunction1 = (childData) => {
        this.setState({upload: childData},()=>this.props.parentCallback2(this.state.upload));
    }
    render(){
return (
        <div className="container-fluid" >
            <div className="modalupload">
                <button className="close" onClick={this.props.close}>
                    &times;
                </button>
                <div className="header"> 
                    Upload your Data File
                </div>
            
            </div>    
            <InputFile parentCallback1={this.callbackFunction1} parentCallback = {this.callbackFunction} />
        </div>
        );
    }
}   
export default UploadModal;