import React from 'react';
import FirstPage from './FirstPageComponents/FirstPage' ;
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import Visualization from './Visualization/Visualization';
import {Provider} from "react-redux";
import store from "./store"
import Loading from './Redirecrtions/Loading';
import LoadingUpload from './Redirecrtions/LoadingUpload';


class App extends React.Component {
 state = { 
        userInfo: "" 
    }
    callbackFunction = (childData) => {
      this.setState({userInfo: childData})
     
}
  render (){
  return (
    
    <Provider store={store}>
    <Router>
    <div className="App">
      <Switch>
      <Route exact path ="/" render={()=><FirstPage parentCallback={this.callbackFunction}/>}/>
      <Route path ="/visualization" render={()=><Visualization  userInfo={this.state.userInfo}/>}/>
      <Route path ="/loading" render={()=><Loading/>}/>
      <Route path ="/loadingUpload" render={()=><LoadingUpload/>}/>
      </Switch>
    </div>
    </Router>

    

    </Provider>
    

  );
}
}

export default App;
