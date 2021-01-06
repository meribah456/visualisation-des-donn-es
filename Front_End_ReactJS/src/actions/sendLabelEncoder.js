import axios from "axios";
const sendLabelEncoder=(columnName,fileId,)=> async dispatch =>{
    try {
        var authToken = localStorage.getItem("authToken")
        var res = Promise.resolve(await axios.post('/LabelEncoder',
        'columnName='+columnName+'&fileIdString='+fileId,{headers: {'Authorization': authToken,}}));
    return res;
    }catch(err) {
        return err;
    }
}
export default sendLabelEncoder ;
