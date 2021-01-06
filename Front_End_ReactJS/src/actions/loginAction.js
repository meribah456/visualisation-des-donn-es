import axios from "axios";
const sendLogInInfo=(user,history)=> async dispatch =>{
    try {
        //const res = Promise.resolve(await axios.post("/login",user));
        const res = Promise.resolve(await axios.post('/login', {
                username: user.email,
                password: user.password,
                },
{
  headers: {
    'Content-Type': 'application/json',
  }
}));localStorage.setItem("username",user.username)
        res.then(function(e){localStorage.setItem("authToken",e['headers']['authorization']);localStorage.setItem("username",JSON.parse(e['config']['data'])['username'])})
    return res;
    }catch(err) {
        return err;
    }
}
export default sendLogInInfo ;