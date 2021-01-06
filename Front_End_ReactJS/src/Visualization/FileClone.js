import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../simple-sidebar.css';
import * as d3 from 'd3';
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
                }

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
                
        }

}
    render() {
        if (this.state.upload==0){
              if(this.props.file){
                    return(
                    <div>
                    <div id="myDivTable" className="border">
                    <a><b>Filename:</b> <i>{this.props.file['filename']}</i><br/></a>
                    <table id="myTable" >
                           <thead id="myhead" >
                          
                            </thead>
                    
                            <tbody id="mybody">
                          
                            </tbody>

                    </table>

                    </div>
                    <button onClick={(e)=>{e.preventDefault();
                                            this.setState({
                                            upload:1
                                            })}} type="button" className="btn btn-outline-primary btn-rounded waves-effect">Charts</button>
                    <button type="button" className="btn btn-outline-primary btn-rounded waves-effect">Edit</button>
                    </div>
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