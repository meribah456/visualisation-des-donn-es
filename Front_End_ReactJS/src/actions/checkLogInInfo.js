import axios from "axios";
const checkLogInInfo=(authToken,history)=> async dispatch =>{
    try {
        var res = Promise.resolve(await axios.get('/api/users',{headers: {'Authorization': authToken,}}));
        return res;
    }catch(err) {
        return err;
    }
}
export default checkLogInInfo ;