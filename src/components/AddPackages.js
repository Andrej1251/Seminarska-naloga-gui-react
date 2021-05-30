
import React from 'react';
import { Form, Button} from "react-bootstrap";
import Cookies from 'universal-cookie';
import api from './ApiCalls';
class Package extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: "",
            Weight:"",
            Price:"",
            Desription:"",
            Location:"",
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }
    handleChange = (event) => {
        //update data if changed
        this.setState({[event.target.name]: event.target.value});
    }

    componentDidUpdate(){
        var paragraph = document.getElementById("elements")
        paragraph.innerHTML = '';
        api.SendPost("paket/TK_Narocila",[this.state.id]).then(function(result) {
            result.forEach(element => {
                const newDiv = document.createElement("div");
                var text = document.createTextNode("Description: "+element.Opis+" Weight: "+element.Teža+" Price: "+element.Cena+" Location: "+element.TrenutnaLokacija);
                newDiv.className="m-2 p-1 bg-info rounded text-white"
                newDiv.appendChild(text)
                paragraph.appendChild(newDiv);
            })
        })
    }

    handleSubmit(event) { 
        const cookies = new Cookies();
        var paragraph = document.getElementById("ErrorVal2");
        //console.log(cookies.get('user')+" "+this.state.Weight+" "+this.state.Price+" "+this.state.Desription+" "+this.state.Location+" "+this.state.id)
        var allData=api.SendPost("paket",[cookies.get('user').ID_Uporabnik,this.state.Weight,this.state.Price,this.state.Desription,this.state.Location,this.state.id])
        allData.then(function(result2) {
            
            if(typeof result2.insertId !== 'undefined'){
                paragraph.className="m-2 p-1 bg-success rounded text-white"
                paragraph.innerHTML = 'success!';
            }else{
                paragraph.className="m-2 p-1 bg-info rounded text-white"
                paragraph.innerHTML = 'error: '+result2.message;
            }
        })
        event.preventDefault();
    }
    componentDidMount(){
        document.getElementById('app-root').style.filter = 'blur(10px)'
        const{ match:{params}}=this.props
        this.setState([this.state.id=params.id])
        
    }
    back(){
        window.open('/sellerHome','_self');
    }
    render() {
        return (
            <div className="mt-5 fixed-top container p-2 border rounded border border-dark" >
                <Form onSubmit={this.handleSubmit}>
                    <h2 className="m-3 display-5">Add packages: </h2>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Weight: </Form.Label>
                        <Form.Control type="number" autoComplete="off" className="form-control" value={this.state.Weight} name="Weight" onChange={this.handleChange}  />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Price: </Form.Label>
                        <Form.Control type="number" autoComplete="off" className="form-control" value={this.state.Price} name="Price" onChange={this.handleChange}  />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Desription: </Form.Label>
                        <Form.Control type="text" autoComplete="off" className="form-control" value={this.state.selectU} name="Desription" onChange={this.handleChange}  />
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Trenutna lokacija (Kje je trenutno paket?): </Form.Label>
                        <Form.Control type="text" autoComplete="off" className="form-control" value={this.state.Location} name="Location" onChange={this.handleChange}  />
                    </Form.Group>
                    <Button variant="primary" className="float-left btn-success" type="submit">Add</Button>
                    <div id="ErrorVal2"></div>
                    <Button className="float-right btn-success" onClick={()=>this.back()}>Ok</Button>
                </Form>
                
                <div className="w-50 p-4 d-inline-block" id="elements">

                </div>
            </div>
        )
    }
}
export default Package;