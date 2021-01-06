import axios from "axios";
const sendFile=(file,history,formdata)=> async dispatch =>{
    try {
        const res = axios({
            url:"/catchFile",
            method:"POST",
            headers:{
              authorization:localStorage.getItem("authToken")
            },
            data:formdata
          }).then((res)=>{
            
          })
          //window.location.href="/loadingUpload";
          return res;
    } catch (err) {
        console.log(err)
    }
}
export default sendFile ;