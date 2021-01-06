import React, { Component } from 'react'
import DisplayVisualization from './DisplayVisualization';
class VisuList extends Component {
    constructor(props){
        super(props)
        this.state = { 
            plotType:0,
            file:null,
            columns:[],
            xAx:"",
            yAx:"",
            hoverColumn:"",
            keyColumn:"",
        }
        this.yAxHandler=this.yAxHandler.bind(this)
        this.xAxHandler=this.xAxHandler.bind(this)
    }
    
    yAxHandler(e){
        this.setState({yAx:e.target.value})
    }
    xAxHandler(e){
        this.setState({xAx:e.target.value})
    }
    hoverColumnHandler(e){
        this.setState({hoverColumn:e.target.value})
    }
    keyColumnHandler(e){
        this.setState({keyColumn:e.target.value})
    }
    

    render() {
        const items = Object.values(this.props.columns);
        items.sort();
        if(this.state.plotType===0){
        return (
            <div>
              <div className="row ml-3 mt-2 col-11">
              <div className="card card-cascade wider special-color col-2" onClick={()=>this.setState({plotType:1})}>

                <div className="view view-cascade overlay mt-2">
                  <img className="card-img-top" src="https://www.d3-graph-gallery.com/img/section/ScatterPlot150.png" />
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                
                <div className="card-body card-body-cascade text-center">

                  <p className="blue-text pb-2" >Scatter</p>

                </div>
              </div>
              <div className="card card-cascade wider special-color col-2 ml-4" onClick={()=>this.setState({plotType:2})}>
                <div className="view view-cascade overlay mt-2">
                  <img className="card-img-top" src="https://www.d3-graph-gallery.com/img/section/Heatmap150.png" />
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                
                <div className="card-body card-body-cascade text-center">

                  <p className="blue-text pb-2">MapData</p>

                </div>
              </div>

              <div className="card card-cascade wider ml-4 special-color col-2" onClick={()=>this.setState({plotType:3})}>
                <div className="view view-cascade overlay mt-2">
                  <img className="card-img-top" src="https://www.d3-graph-gallery.com/img/section/Correlogram150.png" />
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                
                <div className="card-body card-body-cascade text-center">

                  <p className="blue-text pb-2">Correlo-gram</p>

                </div>
              </div>

              <div className="card card-cascade wider ml-4 special-color col-2" onClick={()=>this.setState({plotType:4})}>
                <div className="view view-cascade overlay mt-2">
                  <img className="card-img-top" src="https://www.d3-graph-gallery.com/img/section/BubblePlot150.png" />
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                
                <div className="card-body card-body-cascade text-center">

                  <p className="blue-text pb-2">Bubble</p>

                </div>
              </div>


              <div className="card card-cascade wider ml-4 special-color col-2" onClick={()=>this.setState({plotType:5})}>
                <div className="view view-cascade overlay mt-2">
                  <img className="card-img-top" src="https://www.d3-graph-gallery.com/img/section/2dDensity150.png" />
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                
                <div className="card-body card-body-cascade text-center">

                  <p className="blue-text pb-2">2D Density</p>

                </div>
              </div>
              <div className="card card-cascade wider mt-3 special-color col-2" onClick={()=>this.setState({plotType:6})}>
                <div className="view view-cascade overlay mt-2">
                  <img className="card-img-top" src="https://www.d3-graph-gallery.com/img/section/Correlogram150.png" />
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                
                <div className="card-body card-body-cascade text-center">

                  <h6 className="blue-text pb-2"><strong>Pie Chart</strong></h6>

                </div>
                </div>
                <div className="card card-cascade wider mt-3 ml-4 special-color col-2" onClick={()=>this.setState({plotType:7})}>
                <div className="view view-cascade overlay mt-2">
                  <img className="card-img-top" src="https://www.d3-graph-gallery.com/img/section/Correlogram150.png" />
                  <a href="#!">
                    <div className="mask rgba-white-slight"></div>
                  </a>
                </div>

                
                <div className="card-body card-body-cascade text-center">

                  <p className="blue-text pb-2">Heatmap 2D Histogram</p>

                </div>
              </div>
              </div>
              <br/>
              <div className="row ml-3 col-11">
                  <select className="form-control col-3" onChange={(e)=>this.xAxHandler(e)}>
                <option defaultValue="" disabled selected>X Axis</option>
              {items.map((value) => { 
                  return (
                      <option key={value} defaultValue={value}>{value}</option>)
                          
              })}
              </select>
                  <select className="form-control col-3 ml-1" onChange={(e)=>this.yAxHandler(e)}>
                <option defaultValue="" disabled selected>Y Axis</option>
                {items.map((value) => { 
                  return (
                      <option key={value} defaultValue={value}>{value}</option>)
                          
              })}
              </select>

                  <select className="form-control col-3 ml-1" onChange={(e)=>this.hoverColumnHandler(e)}>
                <option defaultValue="" disabled selected>Hover column or Feature</option>
                {items.map((value) => { 
                  return (
                      <option key={value} defaultValue={value}>{value}</option>)
                          
              })}
              </select>

                  <select className="form-control col-2 ml-1" onChange={(e)=>this.keyColumnHandler(e)}>
                <option defaultValue="" disabled selected>Key column or Population</option>
                {items.map((value) => { 
                  return (
                      <option key={value} defaultValue={value}>{value}</option>)
                          
              })}
              </select>
              </div>
              </div>

        )}else{
            return(<DisplayVisualization file={this.props.file} xAx={this.state.xAx} yAx={this.state.yAx}
        hoverColumn={this.state.hoverColumn} keyColumn={this.state.keyColumn} plotType={this.state.plotType} />)
        }

        
    
    }
}
export default VisuList;

