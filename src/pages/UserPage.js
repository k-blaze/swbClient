import React, {useEffect, useState} from "react";
import Axios from "axios";
import "../App.css";
import {withRouter} from "react-router-dom";


function UserPage() {

    const [user, getUser] = useState("");

    useEffect(() => {
        Axios.get("https://swb-website-api.herokuapp.com/api/you").then((response) => {
            getUser("Hello! This is your page " + localStorage.getItem("isAuth"));
        });
    }, []);


    return (
        <div className="App">
            <h1>
                This is your profile page
            </h1>
            <h2>{user}</h2>

            <p>Thank you for using my site. It's still in development since I'm not yet well versed in the art of making websites, but I hope I will improve soon and I promise you I'll provide more content for you to enjoy!</p>
            <p>
                <img src="https://www.icegif.com/wp-content/uploads/sorry-icegif-2.gif" alt="Sorry!"/>
            </p>
        </div>
    )
}

export default withRouter(UserPage);