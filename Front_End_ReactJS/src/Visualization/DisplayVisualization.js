import React, { Component } from 'react'

import XYScatter from './XYScatter';

import Correlogram from './Correlogram';
import ConnectedScatter from './ConnectedScatter'
import Density2D from './Density2D'
import PieChart from './PieChart'
import HeatMapData from './HeatMapData'
import MapData from './MapData'



class DisplayVisualization extends Component {
    constructor(props){
        super(props)
    }
   componentDidMount(){
            if(this.props.plotType==1){
               XYScatter(this.props.file,this.props.xAx,this.props.yAx,this.props.hoverColumn,this.props.keyColumn); 
           }else if(this.props.plotType==2){
                    MapData()
           }else if(this.props.plotType==3){
                Correlogram(this.props.file)
           }else if(this.props.plotType==4) {
                ConnectedScatter(this.props.file,this.props.xAx,this.props.yAx)
           }else if(this.props.plotType==5) {
                Density2D(this.props.file,this.props.xAx,this.props.yAx,this.props.hoverColumn)

           }else if(this.props.plotType==6) {
                PieChart(this.props.file,this.props.keyColumn,this.props.hoverColumn)

           }else if(this.props.plotType==7) {
                HeatMapData(this.props.file,this.props.xAx,this.props.yAx,this.props.hoverColumn)

           }else  {
                Density2D(this.props.file,this.props.xAx,this.props.yAx,this.props.hoverColumn)

           }
            
            

                
        }

    render() {
        if(this.props.plotType===1){
           return(
                    <div id="test00">
                    
                    </div>
                    )
                 
        }else if(this.props.plotType===2){
            return(
                    <div id="test1" className="mt-4">
                          
                    </div>
                    )
                
        }else if(this.props.plotType===3){
             return(
                    <div id="test2" className="mt-4">
                          
                    </div>
                    )
        
        }else if(this.props.plotType===4) {
             return(
                    <div id="test3" className="mt-4">
                          
                    </div>
                    )
        
        }else if(this.props.plotType===5) {
             return(
                    <div id="test4" className="mt-4">
                          
                    </div>
                    )
        
        }
        else if(this.props.plotType===6) {
             return(
                    <div id="test5" className="mt-4">
                          
                    </div>
                    )
        
        }else if(this.props.plotType===7) {
             return(
                    <div id="test6" className="mt-4">
                          
                    </div>
                    )
        
        }
        else{
             return(
                    <div id="test7" className="mt-4">
                          
                    </div>
                    )
        
        }
        }
         
}

export default DisplayVisualization;