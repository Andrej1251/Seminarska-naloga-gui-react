import { Form, Button} from "react-bootstrap";
import React from 'react';
import api from './ApiCalls';
//import Cookies from 'universal-cookie';

class admin extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {Country:'',Kratica:'',Post:'',City:'',Street:'',Address:''};
    }
    handleChange = (event) => {
        //update data if changed
        this.setState({[event.target.name]: event.target.value});
    }

    
    handleSubmit(event) {
        var paragraph = document.getElementById("ErrorVal");
        api.SendPost("drzava",[this.state.Country,this.state.Kratica]).then(result => { 
            api.SendPost("posta",[this.state.City,this.state.Post,result.insertId]).then(result => { 
                api.SendPost("naslov",[this.state.Street,this.state.Address,result.insertId]).then(result => { 
                    paragraph.className="m-2 p-1 bg-success rounded text-white"
                    paragraph.innerHTML = 'Success!';
                })
            })
        })
        
        event.preventDefault();
    }

    render() {
        return (
            <div className="mt-5 container">
                <Form className="p-2 border rounded border border-dark" onSubmit={this.handleSubmit}>
                    <h2 className="display-5">Insert loaction of box: </h2>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Country:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Country"  autoComplete="off"  onChange={this.handleChange} value={this.state.value} id="selectC"/>
                        <Form.Label>Kartica:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Kratica"  autoComplete="off"  onChange={this.handleChange} value={this.state.value} id="selectK"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Postcode:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Post"  autoComplete="off" onChange={this.handleChange} value={this.state.value} id="selectP"/>
                        <Form.Label>City:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="City"  autoComplete="off" onChange={this.handleChange} value={this.state.value} id="selectC"/>
                    </Form.Group>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Street:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Street"  autoComplete="off"  onChange={this.handleChange} value={this.state.value} id="selectA"/>
                        <Form.Label>Address:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Address"  autoComplete="off"  onChange={this.handleChange} value={this.state.value} id="selectA"/>
                    </Form.Group>
                    <Button variant="primary" className="btn-success" type="submit">
                        insert
                    </Button>
                    <div id="ErrorVal"></div>
                </Form>
            </div>
        )
    }
}
export default admin;