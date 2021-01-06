import React, { Component } from 'react'
import Navbar from './Navbar';

import SideBar from './SideBar';
import PageContent from './PageContent';

class Visualization extends Component {
    state = { 
        statut: "",
        files:[],
        upload:false,
    }
    callbackFunction = (childData,files) => {
      this.setState({statut: childData})
      this.setState({files:files})
}
  callbackFunction1 = (childData) => {
      this.setState({upload: childData})
    
}
    render() {
        return (
            <div>
                <div className="d-flex" id="wrapper">
                    <SideBar parentCallback3={this.callbackFunction1} parentCallback={this.callbackFunction}/>
                    <div id="page-content-wrapper">
                        {this.props.userInfo ? (
                            <Navbar userInfo={this.props.userInfo}/>) :
                        (   <Navbar />)
                        
                        }
                        {this.props.userInfo ? (
                            <PageContent upload={this.state.upload} files={this.state.files} userInfo={this.props.userInfo} statut={this.state.statut}/>) :
                        (   <PageContent upload={this.state.upload} files={this.state.files} statut={this.state.statut}/>)
                        
                        }
                        
                    </div>
                </div>
            </div>
        )
    }
}
export default Visualization;
