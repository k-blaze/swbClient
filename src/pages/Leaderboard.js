import React, {useEffect, useState} from "react";
import Axios from "axios";
import "../App.css";
import {withRouter} from "react-router-dom";

function Leaderboard() {

    const [leaderboard, getLeaderboard] = useState([]);

    useEffect(() => {
        Axios.get("https://swb-website-api.herokuapp.com/api/leaderboard").then((response) => {
            getLeaderboard(response.data)
        })
    }, []);

    return(
        <div className="App">
            <h1>
                BOOK REPOSITORY
            </h1>
            <h2>Here are all of the results sorted from best rated to worst in case you need some recomendations</h2>
            <p>
                {leaderboard.map((val) => {
                    return <div className="form">
                        <div className="card">
                            <h1>
                                {val.title}
                            </h1>
                            <p>
                                Rating: {val.rating}
                            </p>
                        </div>
                    </div>
                })}

            </p>
        </div>
    )
}

export default withRouter(Leaderboard);