import JsonP from "jsonp";
import axios from "axios";
import { Modal } from "antd";
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

    static ajax(options){
        let loading;
        if(options.data && options.data.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        let baseUrl = 'https://www.easy-mock.com/mock/5b7566790493931ae0088d15/mockapi';
        return new Promise((resolve, rejects) => {
            axios({
                url:options.url,
                method:'get',
                baseURL:baseUrl,
                timeout:5000,
                params: (options.data && options.data.params) || ''
            }).then(response => {
                if (options.data && options.data.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if (response.status == '200'){
                    if (response.data.code == '0'){
                        resolve(response.data);
                    }else{
                        Modal.info({
                            title:"提示",
                            content: response.data.msg
                        })
                    }
                }else{
                    rejects(response);
                }
            });
        });

    } 
}