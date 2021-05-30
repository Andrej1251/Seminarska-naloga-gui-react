import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login';
import SellerHome from './components/SellerHome';
import AddPackages from './components/AddPackages';
import Home from './components/Home';
import DelOrder from './components/DelOrder';
import {BrowserRouter, Route} from 'react-router-dom';

function Setup(){
  return(
    <div className="Router">
      <Route path="/login" component={Login}></Route>
      <Route path="/sellerHome" component={SellerHome}></Route>
      <Route path="/sellerHome/:id" component={AddPackages}></Route>
      <Route path="/Home" component={Home}></Route>
      <Route path="/DelOrder/:id" component={DelOrder}></Route>

    </div>
  )
}
ReactDOM.render(<BrowserRouter><Setup></Setup></BrowserRouter>,document.getElementById("root"));
