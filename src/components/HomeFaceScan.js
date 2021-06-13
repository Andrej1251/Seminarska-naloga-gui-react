import React from 'react';
import Cookies from 'universal-cookie';
import api from './ApiCalls';

class homeFaceScan extends React.Component{

    componentDidMount(){
        //http://localhost:3000/HomeFaceScan?username=zmago&passward=12345
        //const {match:{params}}=
        console.log(this.props.location.search)
        var data = this.props.location.search;
        var a = data.slice(1)
        var odg=a.split("&")
        console.log("username: ",odg[0])
        console.log("password: ",odg[1])

        var paragraph = document.getElementById("ErrorVal");
        var allData=api.SendPost("uporabnik/find",[odg[0],odg[1]]);
        allData.then(function(result) {
            if(result.length!==0){
            const cookies = new Cookies();
            //console.log(cookies.get('user').ID_Uporabnik);
            cookies.remove('user', { path: '/' })
            cookies.set('user', result[0], { path: '/' });
            //tip uporabnika => 1=admin 2=normalni uporabniki 3=prodajalec
            window.open('/Home','_self');
            }
        })
        
    }

    render(){
        return(
            <h1>Welcome</h1>
        )
    }
}

export default homeFaceScan;