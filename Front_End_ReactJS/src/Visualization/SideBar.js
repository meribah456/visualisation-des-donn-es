import React, { Component } from 'react';
import Popup from "reactjs-popup";
import 'bootstrap/dist/css/bootstrap.css';
import '../simple-sidebar.css';
import '../Modals/modal.css'
import UploadModal from '../Modals/UploadModal';
import 'mdbreact/dist/css/mdb.css'
import 'mdbreact/dist/css/style.css'
import '.././FirstPageComponents/Logo.css'

class SideBar extends Component {
    constructor(){
        super();
        this.state={
            statut:0,
            files:[],
            upload:false,
        }
        this.onClick=this.onClick.bind(this);
        this.onClickUpload=this.onClickUpload.bind(this);
        this.onClickfiles=this.onClickfiles.bind(this);
        this.onClickProfil=this.onClickProfil.bind(this);
        this.remount=this.remount.bind(this)
    }
    onClick(e){
        this.setState({
            'statut':1,
        }) 
        this.props.parentCallback(this.state.statut);
    };
    onClickfiles(e){
        this.setState({
            'statut':2,
        }) 
        this.props.parentCallback(this.state.statut,this.state.files);
        console.log(this.state.statut)
    };
    onClickUpload(e){
        this.setState({
            'statut':1000,
        }) 
        this.props.parentCallback(this.state.statut);
       
    };
    onClickProfil(e){
        this.setState({
            'statut':3,
        }) 
        this.props.parentCallback(this.state.statut);
       
    };
    callbackFunction = (childData) => {
      this.setState({files: childData})
    };
    callbackFunction1 = (childData) => {
      this.setState({upload: childData},()=>this.props.parentCallback3(this.state.upload))
    };
    remount(){
        if(this.state.statut===-2){
            this.setState({
                statut:2
            })
        }else{
            this.setState({
                statut:-2
            })
        }
    }

    
    render() {
        return (
            <div className="d-flex" id="wrapper">
                <div className="bg-light border-right" id="sidebar-wrapper">
                    <div className="sidebar-heading mt-2"><h5 id="sidebar">Data Visualization</h5></div>
                    
                    <div className="list-group list-group-flush bg-light">
                        
                        <button onMouseDown={this.onClickfiles} onClick={this.remount} onMouseUp={this.onClickfiles} className="list-group-item list-group-item-action bg-light"><i className="fas fa-file mdb-gallery-view-icon mr-3"></i>My Files</button>
                        <Popup modal trigger={<button onMouseDown={this.onClickUpload} onMouseUp={this.onClickUpload} className="list-group-item list-group-item-action bg-light"><i className="fas fa-file-upload mdb-gallery-view-icon mr-3"></i>Upload</button>}>
                                    {close => <UploadModal parentCallback2={this.callbackFunction1} parentCallback1 = {this.callbackFunction} close={close} />}
                        </Popup>
                        <a href="#" className="list-group-item list-group-item-action bg-light">Events</a>
                        <button onMouseDown={this.onClickProfil} onMouseUp={this.onClickProfil}  className="list-group-item list-group-item-action bg-light" onClick={()=>this.setState({statut:3})}><i className="fas fa-user mr-3"></i>User Profile (en/dis)</button>
      
                        <a href="#" className="list-group-item list-group-item-action bg-light"><i className="far fa-question-circle mdb-gallery-view-icon mr-3"></i>Help</a>
                    </div>
                </div>
            </div>
                   
                
                    )
    }
}
export default SideBar ;