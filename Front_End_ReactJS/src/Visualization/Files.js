import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import '../simple-sidebar.css';
import File from './File';
import PropTypes from "prop-types";
import {connect} from "react-redux";
import GetUserFiles from "../actions/GetUserFiles";




class Files extends Component {
            constructor(props){
                super(props)
                this.state={
                    temoin:-1,
                    files:[],
                    upload:0,
                }

            }


            componentDidMount(){
                this.props.GetUserFiles(this.props.history).then((val)=>{
                            this.setState({files:val['data']})
                        });
                this.setState({upload:this.props.upload})
            }

            SearchFunction() {
                  var input, i, txtValue, children,searchSubject;
                  input = document.getElementById("form1").value;
                  searchSubject = document.getElementById("listGroup");
                  children = searchSubject.childNodes;
                  for (i = 0; i < children.length; i++) {
                    if(children[i].textContent){
                      txtValue = children[i].textContent.split(".csv")[0]+".csv";
                      if (txtValue===input) {
                        children[i].classList.remove("d-none");
                        children[i].classList.add("d-flex");
                      }else{
                        children[i].classList.add("d-flex");
                        children[i].classList.remove("d-none");
                      }
                    }
                }
            }


            render() {

                if(this.state.temoin==-1){
                    //this.props.userInfo
                    if(localStorage.getItem("authToken")){
                        //const files = this.props.userInfo['data']['files'];
                        const items = Object.values(this.state.files);
                        items.sort();
                        return(
                            <div className="card card-cascade narrower bg-white">

                            <div className="view view-cascade gradient-card-header blue-gradient mt-2 narrower py-2 mx-4 mb-0 d-flex justify-content-between align-items-center rounded-lg">
                            {this.props.alert?
                            <div class="alert alert-danger mt-3 ml-3 t">
                            File removed
                            </div> :
                              <div></div>
                            }



    <div className="md-form col-8 d-flex justify-content-center">
        <input type="text" id="form1" placeholder="Search" name="SearchField" onKeyUp={this.SearchFunction}/>

    </div>
  </div>

                            <div className="px-4">
                            <div className="list-group overflow-auto" id="listGroup" style={{height:"500px"}}>

                                    {items.map((value,index) => {
                                        return (
                                            <button key={index} onClick={(e)=>{
                                                e.preventDefault();
                                                this.setState({
                                                    temoin:index
                                                })
                                            }} className="list-group-item d-flex justify-content-between align-items-center list-group-item-action dark-mode-files">
                                                {value.filename}
                                                <span className="badge badge-primary badge-pill">
                                                    {(atob(value.file).length/Math.pow(10,6)).toPrecision(4)} MB
                                            </span>
                                            </button>)
                                })}
                        </div></div></div>
                            )
                    }else{

                        return(<div>NO FILES</div>)
                    }
                }else{

                    return(<File userInfo={this.props.userInfo} file={this.state.files[this.state.temoin]}/>)

                }
        }

    }
Files.propTypes={
    GetUserFiles : PropTypes.func.isRequired,
}
export default connect(null,{ GetUserFiles })(Files) ;
