import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../simple-sidebar.css';
import axios from 'axios';
import * as dr3 from'd3-dsv'
import PopulateTable from './PopulateTable';

import rd3 from 'react-d3-library';

import EditList from './EditList';
import VisuList from './VisuList';
import Files from './Files';


const RD3Component = rd3.Component;

class File extends Component {
    constructor(){
                super()
                this.state={
                    upload:0,
                    file:null,
                    dataColumns:[],
                    remount:false
                }
                this.VisuListHandler=this.VisuListHandler.bind(this)
                this.deleteHandler=this.deleteHandler.bind(this)

            }
    VisuListHandler(){
      this.setState({upload:2})
    }
    async deleteHandler(){
      var authToken = localStorage.getItem("authToken")
      Promise.resolve(await axios.post('/deleteFile',
      'fileId='+this.props.file['id_file'],{headers: {'Authorization': authToken,}}));
      this.setState({
        remount:!this.state.remount
      })
    }
    componentDidMount(){
        if(this.props.file){
                //const files=this.props.userInfo['data']['files'];
                //var str = atob(this.props.userInfo['data']['files'][this.props.temoin]['file']);
                var str = atob(this.props.file['file'])
                const data = dr3.csvParse(str);
                var columns = data['columns'];
                PopulateTable(data,columns);
                this.setState({file:data})
                this.setState({dataColumns:columns})
                
        }

}

    render() {
      if(this.state.remount===false){
        if (this.state.upload==0){
          if(this.props.file){
        return(
  <div className="card card-cascade narrower dark-mode-text-hover dark-mode bg-white" >

<div
className="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-0 d-flex justify-content-between align-items-center rounded-lg">

<div>
  
  <button onClick={(e)=>{e.preventDefault();this.setState({upload:1})}} type="button" className="btn btn-outline-white btn-rounded btn-sm px-2">
    <i className="fas fa-columns mt-0"></i>
  </button>
</div>

<a href="" className="white-text mx-3"><i>{this.props.file['filename']}</i></a>

<div>
  <button type="button" onClick={(e)=>{e.preventDefault();this.setState({upload:2})}} className="btn btn-outline-white btn-rounded btn-sm px-2">
    <i className="fas fa-pencil-alt mt-0"></i>
  </button>
  <button type="button" onClick={this.deleteHandler} className="btn btn-outline-white btn-rounded btn-sm px-2">
    <i className="far fa-trash-alt mt-0"></i>
  </button>
  <button type="button" className="btn btn-outline-white btn-rounded btn-sm px-2">
    <i className="fas fa-info-circle mt-0"></i>
  </button>
</div>

</div>
                <div className="px-4">
                <div id="myDivTable" className="border table-wrapper mt-0">
                <table id="myTable" className="table table-hover mb-0">
                       <thead id="myhead" >

                        </thead>
                
                        <tbody id="mybody">
                      
                        </tbody>

                </table>

                </div>
                
                </div></div>
            )
        }else{

            return(<div>NO FILES</div>) 
    }


    }else if(this.state.upload===2){
        return(<EditList columns={this.state.dataColumns} fileId={this.props.file['id_file']}/>)
    }else{
      return(<VisuList file={this.state.file} columns={this.state.dataColumns} />)
    }
      }else{
        return(<Files alert=
          "true" userInfo={this.props.userInfo} />)
      }
        
      }
}

export default File;