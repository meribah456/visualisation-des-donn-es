import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../simple-sidebar.css';
import * as dr3 from'd3-dsv'
import PopulateTable from './PopulateTable';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import { withRouter } from 'react-router-dom';
import rd3 from 'react-d3-library';
import XYScatter from './XYScatter';
import DisplayVisualization from './DisplayVisualization'

const RD3Component = rd3.Component;

class File extends Component {
    constructor(){
                super()
                this.state={
                    upload:0,
                    file:null,
                    columns:[],
                }

            }
    componentDidMount(){
        if(this.props.file){
                //const files=this.props.userInfo['data']['files'];
                //var str = atob(this.props.userInfo['data']['files'][this.props.temoin]['file']);
                var str = atob(this.props.file['file'])
                const data = dr3.csvParse(str);
                this.setState({columns:data['columns']})
                //var columns = data['columns'];
                PopulateTable(data,this.state.columns);
                this.setState({file:data})
                
                
        }

}

    render() {
        if (this.state.upload==0){
              if(this.props.file){
                //const items = Object.values(this.state.columns);
                    return(
                        <div className="card card-cascade narrower dark-mode-text-hover dark-mode bg-white" >

  <div
    className="view view-cascade gradient-card-header blue-gradient narrower py-2 mx-4 mb-0 d-flex justify-content-between align-items-center rounded-lg">

    <div>
      <button type="button" className="btn btn-outline-white btn-rounded btn-sm px-2">
        <i className="fas fa-th-large mt-0"></i>
      </button>
      <button onClick={(e)=>{e.preventDefault();this.setState({upload:1})}} type="button" className="btn btn-outline-white btn-rounded btn-sm px-2">
        <i className="fas fa-columns mt-0"></i>
      </button>
    </div>

    <a href="" className="white-text mx-3"><i>{this.props.file['filename']}</i></a>

    <div>
      <button type="button" className="btn btn-outline-white btn-rounded btn-sm px-2">
        <i className="fas fa-pencil-alt mt-0"></i>
      </button>
      <button type="button" className="btn btn-outline-white btn-rounded btn-sm px-2">
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


        }else{
            return (<DisplayVisualization file={this.state.file} yAx='longitude' xAx='latitude' hoverColumn='median_house_value' keyColumn='ocean_proximity'/>)
                       
            
    }
        }
}

export default File;