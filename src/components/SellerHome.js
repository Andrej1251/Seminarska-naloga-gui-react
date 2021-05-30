
import React from 'react';
//import { alignPropType } from 'react-bootstrap/esm/DropdownMenu';
//import { Form, Button} from "react-bootstrap";

import api from './ApiCalls';
class sellH extends React.Component {
    state={
        selectC: "",
        selectP: "",
        selectA: "",
        selectU: "",
        ReciveDate:"",
        SendDate:""
    }
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);

    }
    handleChange = (event) => {
        this.setState({[event.target.name]: event.target.value});
    }

    UploadData(){
        //username find
        if(this.state.selectU!==null){
            var a=this.state.selectU
            var Location=this.state.selectA
            var ReciveDate=this.state.ReciveDate
            var SendDate=this.state.SendDate
            api.SendGet("uporabnik").then(function(result) {
                var paragraph = document.getElementById("ErrorVal");
                result.forEach((element) => {
                    if(element.Uporabniško_ime===a){
                        api.SendPost("narocila",[element.ID_Uporabnik,Location,0,ReciveDate,SendDate]).then(function(result2) {
                            if(typeof result2.insertId !== 'undefined'){
                                paragraph.className="m-2 p-1 bg-success rounded text-white"
                                paragraph.innerHTML = 'success!';
                                window.open('/sellerHome/'+result2.insertId ,'_self');
                            }
                            else{
                                paragraph.className="m-2 p-1 bg-info rounded text-white"
                                paragraph.innerHTML = 'error: '+result2.message;
                            }
                        })
                    }
                })
                
            })
        }
    }

    old="" //postcode
    old2="" //address

    componentDidUpdate(){
        var addP = document.getElementById("selectP");
        //posta
        if(this.old!==this.state.selectC){
            api.SendPost("posta/TK_Drzava",[this.state.selectC]).then(function(result) {
                while (addP.firstChild) {
                    addP.removeChild(addP.lastChild);
                }
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode("choose option"));
                opt.value =0;
                addP.appendChild(opt)
                
                result.forEach((element) => {
                    var opt = document.createElement('option');
                    opt.appendChild( document.createTextNode(element.Kraj+" "+element.PoštnaStevilka) );
                    opt.value =element.ID_pošta;
                    addP.appendChild(opt); 
                })
        })
        }
        this.old=this.state.selectC

        //naslov
        var addA = document.getElementById("selectA");
        if(this.old2!==this.state.selectP){
            api.SendPost("naslov/TK_posta",[this.state.selectP]).then(function(result) {
                while (addA.firstChild) {
                    addA.removeChild(addA.lastChild);
                }
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode("choose option"));
                opt.value =0;
                addA.appendChild(opt)
                
                result.forEach((element) => {
                    var opt = document.createElement('option');
                    opt.appendChild( document.createTextNode(element.Ulica+" "+element.Hišna_številka) );
                    opt.value =element.ID_Naslov;
                    addA.appendChild(opt); 
                })
            })
        }
        
        this.old2=this.state.selectP

    }
    
    componentDidMount(){
        var addC = document.getElementById("selectC");
        api.SendGet("drzava").then(function(result) {
            var opt = document.createElement('option');
            opt.appendChild( document.createTextNode("choose option"));
            opt.value =0;
            addC.appendChild(opt)
            result.forEach((element) => {
                var opt = document.createElement('option');
                opt.appendChild( document.createTextNode(element.Naziv+" ("+element.Kartica+")") );
                opt.value =element.ID_Država;
                addC.appendChild(opt); 
            } )
        })
    }
    render() {
        return (
            <div className="mt-5 container p-2 border rounded border border-dark" id="app-root">
                <h1 className="m-3 display-5">Add order: </h1>
                <div className="mt-5 container">
                    <div className="p-2 border rounded border border-dark" > 
                        <h2 className="display-5">Select location of box: </h2>
                        Country:<select className="mdb-select m-3 md-form" name="selectC" defaultValue="start" onChange={this.handleChange} value={this.state.value} id="selectC">
                        </select>
                        Postcode: <select className="mdb-select m-3 md-form" name="selectP" defaultValue="start" onChange={this.handleChange} value={this.state.value} id="selectP">
                        </select>
                        Address: <select className="mdb-select m-3 md-form" name="selectA" defaultValue="start"  onChange={this.handleChange} value={this.state.value} id="selectA">
                        </select>
                    </div>
                </div>
                <div className="mt-5 container">
                    <div className="p-2 border rounded border border-dark" > 
                        <h2 className="display-5">Write username of reciver: </h2>
                            <label>Username: </label>
                            <input type="text" autoComplete="off" className="form-control" value={this.state.selectU} name="selectU" onChange={this.handleChange}  />
                    </div>
                </div>
                <div className="mt-5 container">
                    <div className="p-2 border rounded border border-dark" > 
                        <h2 className="display-5">Dates: </h2>
                        <label>Write sent date: </label>
                        <input type="text" autoComplete="off" name="SendDate" className="form-control" onChange={this.handleChange}  placeholder="yyyy.m.d h.m.s" />
                        
                        <label>Write estemated delivery date: </label>
                        <input type="text" autoComplete="off" name="ReciveDate" className="form-control" onChange={this.handleChange}  placeholder="yyyy.m.d h.m.s" />
                    </div>
                </div>
                <button type="button" className="m-2 btn btn-success" onClick={()=>this.UploadData()}>Submit</button>
                <div id="ErrorVal"></div>
            </div>
        )
    }
}
export default sellH;