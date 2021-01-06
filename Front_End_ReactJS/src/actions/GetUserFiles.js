import axios from "axios";
const GetUserFiles=(history)=> async dispatch =>{
    try {
        var authToken = localStorage.getItem("authToken")
        var res = Promise.resolve(await axios.get('/getUserFiles',{headers: {'Authorization': authToken,}}));
    return res;
    }catch(err) {
        return err;
    }
}
export default GetUserFiles ;
