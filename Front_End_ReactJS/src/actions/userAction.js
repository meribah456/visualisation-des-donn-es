import axios from "axios";
const createUser=(user,history)=> async dispatch =>{
    try {
        const res = await axios.post("/api/user",user);
        window.location.href="/loading";
        
    } catch (err) {
        console.log(err)
    }
}
export default createUser ;