import axios from "axios";
const EditUserInfo=(user,history)=> async dispatch =>{
    try {
      var authToken = localStorage.getItem("authToken")
      var username = localStorage.getItem("username")
      var res = Promise.resolve(await axios.post('/api/editUserInfo',
      'username='+username+'&oldPwd='+user.RecentPassword+'&newPwd='+user.NewPassword,{headers: {'Authorization': authToken,}}));
    return res;
    }catch(err) {
        return err;
    }
}
export default EditUserInfo ;