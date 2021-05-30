import React from 'react';
import Cookies from 'universal-cookie';
import api from './ApiCalls';
class homeR extends React.Component {
    
    //state={list: []}
    
    componentDidMount(){
        const cookies = new Cookies();
        var button = document.getElementById("user");
        
        if(cookies.get('user').Tip_uporabnika===3){
            button.style.visibility="visible"
        }else button.style.visibility="hidden"

        
        //create massive list of all data
        api.SendGet("narocila").then(result => { //get all narocila
            result.forEach(element => {
                
                const newDiv = document.createElement("div");
                if(cookies.get('user').Tip_uporabnika!==2){
                    const a=document.createElement("a");
                    a.href="/DelOrder/"+element.ID_Naročila
                    a.innerHTML="Delete"
                    a.className="m-2 float-right btn btn-success"
                    newDiv.appendChild(a)
                }
                //add Info div
                newDiv.className="p-2 m-1 bg-light border rounded border border-dark"
                var newh4 = document.createElement("h4");
                newh4.className="display-5"
                newh4.innerText="Info:"
                newDiv.appendChild(newh4)

                var newd = document.createElement("p");
                newd.innerHTML=" Active: <b>"+element.Active+"</b> Date of delivery: <b>"+element.DatumPrejetja+"</b> Send date: "+element.DatumPoslanosti
                newd.className="display-5"
                newDiv.appendChild(newd)

                //get Uporabnik by id
                api.SendPost("uporabnik/id",[cookies.get('user').ID_Uporabnik]).then(result => {
                    var newd = document.createElement("p");
                    newd.innerHTML="User: Ime: "+result[0].Ime+" Priimek: "+result[0].Priimek+" Datum preklica: "+result[0].DatumPreklica+""
                    newd.className="display-5"
                    newDiv.appendChild(newd)
                })
                
                //get loaction
                //get naslov
                api.SendPost("naslov/id",[element.TK_Naslov_posiljatelja]).then(result3 => {
                    result3.forEach(element => {
                        var newd = document.createTextNode("Lokacija: Ulica: "+element.Ulica+" "+element.Hišna_številka);
                        newd.className="display-5"
                        newDiv.appendChild(newd)
                        //get post
                        api.SendPost("posta/id",[element.TK_posta]).then(result4 => {
                            result4.forEach(element => {
                                var newd = document.createTextNode(" Kraj: "+element.Kraj+" "+element.PoštnaStevilka);
                                newd.className="display-5"
                                newDiv.appendChild(newd)
                                //get country
                                api.SendPost("drzava/id",[element.TK_Drzava]).then(result4 => {
                                    result4.forEach(element => {
                                        var newd = document.createTextNode(" Drzava: "+element.Naziv+" "+element.Kartica);
                                        newd.className="display-5"
                                        newDiv.appendChild(newd)
                                    })
                                })
                            })
                        })
                    })
                    
                });
                
                
                //get all packet with id
                api.SendPost("paket/TK_Narocila",[element.ID_Naročila]).then(result => {
                    var newDiv2=document.createElement("div")
                    newDiv2.className="p-2 m-1 bg-white border rounded border border-dark"
                    var newh4 = document.createElement("h4");
                    newh4.className="display-5 "
                    newh4.innerText="packages :"
                    newDiv2.appendChild(newh4)

                    result.forEach(element => {
                        //add paket div
                        var newh4 = document.createElement("h5");
                        newh4.className="display-5 p-2 m-1 bg-info border rounded border border-dark"
                        newh4.innerHTML="Decription: "+element.Opis+" Weight: "+element.Teža+" Price: "+element.Cena+" <b>Package location now: "+element.TrenutnaLokacija+"</b>"
                        newDiv2.appendChild(newh4)
                    })
                    newDiv.appendChild(newDiv2)
                });

                var fulldata = document.getElementById("fulldata");
                
                fulldata.appendChild(newDiv)
            })
        })
    }
    
    render() {
        return (
            <div>
                <a href="/sellerHome" type="button" visibility="hidden" className="m-2 float-right btn btn-success" id="user">Add new order</a>
                <h2 className="m-2 display-5">orders: </h2>
                <div className="mt-5 container" id="fulldata">
                </div>
            </div>
        )
        
        
    }
}
export default homeR;