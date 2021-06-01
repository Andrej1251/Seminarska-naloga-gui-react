import { Form, Button} from "react-bootstrap";
import React from 'react';
import api from './ApiCalls';
import Cookies from 'universal-cookie';

class user extends React.Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange  = this.handleChange.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
        this.state = {Name:'',Surname:'',Password:'',Location:0,Username:'',Date:'',User:0,Email:''};
    }
    handleChange = (event) => {
        //update data if changed
        this.setState({[event.target.name]: event.target.value});
        
    }
    componentDidUpdate(){
        var paragraph = document.getElementById("ErrorVal2");
        paragraph.innerHTML = "";
        api.SendPost("naslov/id",[this.state.Location]).then(function(result) {
            
            if(typeof result[0]!=="undefined"){
                paragraph.className="m-2 p-1 bg-success rounded text-white"
                paragraph.innerHTML = 'Address found: '+result[0].Ulica+"!";
            }
            else{
                paragraph.className=""
                paragraph.innerHTML = "";
            }
        })
    }

    handleSubmit(event) {
        var paragraph = document.getElementById("ErrorVal");
        paragraph.innerHTML = "";
        api.SendPost("uporabnik",[this.state.Name,this.state.Surname,this.state.Username,this.state.Password,this.state.Location,this.state.Date,this.state.User,this.state.Email]).then(function(result) {
            if(typeof result.insertId!=="undefined"){
                paragraph.className="m-2 p-1 bg-success rounded text-white"
                paragraph.innerHTML = 'sucess!';
            }else{
                paragraph.className="m-2 p-1 bg-danger rounded text-white"
                paragraph.innerHTML = 'Fail!';
            }
        })
        event.preventDefault();
    }

    render() {
        //const cookies = new Cookies();
        //if(cookies.get('user').Tip_uporabnika==1){}   
        return (
            <div className="mt-5 container">
                <Form className="p-2 border rounded border border-dark" onSubmit={this.handleSubmit}>
                    <Form.Group controlId="formBasicText">
                        <h2 className="display-5">Adduser</h2>
                        <Form.Label>Name:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Name"  autoComplete="off"  onChange={this.handleChange} value={this.state.value} />
                        <Form.Label>Surname:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Surname"  autoComplete="off"  onChange={this.handleChange} value={this.state.value} />
                        <Form.Label>Username:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Username"  autoComplete="off" onChange={this.handleChange} value={this.state.value} />
                        <Form.Label>email:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Email"  autoComplete="off" onChange={this.handleChange} value={this.state.value} />
                        <Form.Label>Password:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Password"  autoComplete="off" onChange={this.handleChange} value={this.state.value} />
                        <Form.Label>Add location:</Form.Label>
                        <Form.Control className="mdb-select md-form" type="number" name="Location"  autoComplete="off" onChange={this.handleChange} value={this.state.value}/>
                        <div id="ErrorVal2"></div>
                        <Form.Label>Add date of end:</Form.Label>
                        <Form.Control className="mdb-select md-form" name="Date"  autoComplete="off" onChange={this.handleChange} value={this.state.value}/>
                        <Form.Label>Select type of user:</Form.Label><br/>
                        <select name="User" onChange={this.handleChange} value={this.state.value}>
                            <option value="0">select!</option>
                            <option value="1">admin</option>
                            <option value="2">Normal user</option>
                            <option value="3">seller</option>
                        </select>
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
export default user;