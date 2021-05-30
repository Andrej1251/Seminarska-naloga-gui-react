import { Form, Button} from "react-bootstrap";
import React from 'react';
import api from './ApiCalls';
import Cookies from 'universal-cookie';

class Login extends React.Component {
    constructor(props){
      super(props);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.state = {Username:'',Password:''};
    }
    handleChange = (event) => {
      //update data if changed
      this.setState({[event.target.name]: event.target.value});
    }

    
    handleSubmit(event) { 
      //call api and check if user is in database
      //uporabnik
      var paragraph = document.getElementById("ErrorVal");
      var allData=api.SendPost("uporabnik/find",[this.state.Username,this.state.Password]);
      allData.then(function(result) {
        if(result.length!==0){
          const cookies = new Cookies();
          //console.log(cookies.get('user').ID_Uporabnik);
          cookies.remove('user', { path: '/' })
          cookies.set('user', result[0], { path: '/' });
          paragraph.className="m-2 p-1 bg-success rounded text-white"
          paragraph.innerHTML = 'Success!';
          //tip uporabnika => 1=admin 2=normalni uporabniki 3=prodajalec
          window.open('/Home','_self');
        }
        else{
          paragraph.className="m-2 p-1 bg-danger rounded text-white"
          paragraph.innerHTML = "Error!";
        }
      })
      event.preventDefault();
    }
    render() {
        return (
            <div className="mt-5 container">
                <Form className="p-2 border rounded border border-dark" onSubmit={this.handleSubmit}>
                    <h2 className="display-5">login</h2>
                    <Form.Group controlId="formBasicText">
                        <Form.Label>Username:</Form.Label>
                        <Form.Control type="text" value={this.state.value} autoComplete="off" name="Username" onChange={this.handleChange}  placeholder="Username" />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control type="password" value={this.state.value} autoComplete="off" name="Password" onChange={this.handleChange}  placeholder="Password" />
                    </Form.Group>
                    <Button variant="primary" className="btn-success" type="submit">
                      Login
                    </Button>
                    <div id="ErrorVal"></div>
                </Form>
            </div>
        );
    }
}
 
export default Login;
