class  api{
    static async SendGet(tablename){
        try{
            var el=fetch("http://127.0.0.1:5000/"+tablename, {
                "method": "GET",
                "headers": {
                "content-type": "application/json",
                },
            }).then((resp) => resp.json());
            
            return await el.then(function(data) {
                return data
            })
        }catch(e){
            console.log(e)
        }
    }
    static async SendPost(tablename,data){
        try{
            var el=fetch("http://127.0.0.1:5000/"+tablename, {
                "method": "POST",
                "headers": {
                "content-type": "application/json",
                },
                "body":JSON.stringify(data)
            }).then((resp) => resp.json());
            
            return await el.then(function(data) {
                return data
            })
        }catch(e){
            console.log(e)
        }
    }
    static async SendDel(tablename,id){
        try{
            var el=fetch("http://127.0.0.1:5000/"+tablename, {
                "method": "DELETE",
                "headers": {
                    "content-type": "application/json",
                },
                "body":JSON.stringify(id)
            }).then((resp) => resp.json());
            
            return await el.then(function(data) {
                return data
            })
        }catch(e){
            console.log("del:"+e)
        }
    }
    static async SendUpdate(tablename,data){
        try{
            console.log(data)
            var el=fetch("http://127.0.0.1:5000/"+tablename, {
                "method": "PATCH",
                "headers": {
                    "content-type": "application/json",
                },
                "body":JSON.stringify(data)
            }).then((resp) => resp.json());
            return await el.then(function(data) {
                return data
            })
        }catch(e){
            console.log("del:"+e)
        }
    }

}
export default api;