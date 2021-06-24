import React, {useState} from "react";
import Axios from "axios";

function Registration() {
    const [usernameReg, setUsernameReg] = useState("")
    const [passwordReg, setPasswordReg] = useState("")
    const [confirmation, getConfirmation] = useState("")

    const refreshPage = ()=>{
        window.location.reload();
    }

    const Register = () => {
        Axios.post("https://swb-website-api.herokuapp.com/api/register", {
            usernameReg: usernameReg,
            passwordReg: passwordReg
        }).then((response) => {
            console.log(response);
            getConfirmation(response.data.message);
        });

        //refreshPage();
    };

    return(
        <div>
            <h1>Registration</h1>
            <div className="form">
                <label>Your new username:</label>
                <br/>
                <input type="text" onChange={(e) => {
                    setUsernameReg(e.target.value);
                }}/>
                <br/>
                <label>Your new password:</label>
                <br/>
                <input type="password" onChange={(e) => {
                    setPasswordReg(e.target.value);
                }}/>
                <br/>
                <button onClick={Register}>Submit</button>
                <br/>
                <p>{confirmation}</p>
            </div>
        </div>

    )
}

export default (Registration);