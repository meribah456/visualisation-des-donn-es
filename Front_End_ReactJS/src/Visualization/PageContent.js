import React, { Component } from 'react'
import Files from './Files';
import 'bootstrap/dist/css/bootstrap.css';
import '../simple-sidebar.css';
import './laptop.css';
import vispro from '../Video/vispro.mp4'
import EditUser from './EditUser';

class PageContent extends Component {
    render() {
        console.log(this.props.statut)
        

        if (this.props.statut===2) {
            return (
                <Files upload={this.props.upload} userInfo={this.props.userInfo}/>
            )
        }else if(this.props.statut===1){
                return(
                <div>

                </div>
                )
        }else if(this.props.statut===5){
            return(
                <div>

                </div>
                )
        }
        else if(this.props.statut===3){
            return(
                <div>
                  <EditUser/>
                </div>
                )
        }else {
            return(
                <div>
                <div id="test">
                    <div id="video">
                    <video  id="video2" loop autoPlay>
                    <source src={vispro} type="video/mp4"/>
                    </video>
                    </div>
                </div>
                <div id="OURTOOL">
                    Visualization, made Simple.
                </div>
                </div>
                )
        }
        
    }
}
export default  PageContent;