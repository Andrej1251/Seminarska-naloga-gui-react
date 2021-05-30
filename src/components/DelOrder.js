import React from 'react';
import api from './ApiCalls';
//import Cookies from 'universal-cookie';
//import api from './ApiCalls';
class del extends React.Component {
    componentDidMount(){
        const{ match:{params}}=this.props
        //params.id
        
        api.SendDel("paket",[params.id]).then(function(result) {
            console.log(result)
            api.SendDel("narocila",[params.id]).then(function(result) {
                console.log(result)
            })
        })
        
        window.open('/Home','_self');
    }
    render() {
        return (
            <div className="mt-5 d-flex justify-content-center">
                <div className="spinner-border text-success" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
        )
    }
}
export default del;