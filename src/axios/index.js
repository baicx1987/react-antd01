import JsonP from "jsonp";
export default class Axios{
    static jsonp(options){
        return new Promise((resolve,rejects) => {
            JsonP(options.url,{
               param:'callback' 
            },function (err,response) {
                //todo
               // debugger;
                if(response.status === 'success'){
                    resolve(response);
                }else{
                    rejects(response);
                }
            })
        });
    }
}