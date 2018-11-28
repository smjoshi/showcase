
import axios from 'axios';

class ApiHandler  {



    postCall(apiUrl: string, postObjet: any) {
        axios.post(apiUrl, postObjet).then(res => ({res}));
    }

    getCall(apiUrl: string) {
        axios.get(apiUrl).then( res => ({res}));
    }
};

export default ApiHandler;


