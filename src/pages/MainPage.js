import React, {useEffect, useState} from "react";
import Axios from "axios";
import "../App.css";
import {withRouter} from "react-router-dom";
import axios from "axios";

function MainPage() {

    const [storyList, getStoryList] = useState([]);
    const [newDesc, setNewDesc] = useState("");

    axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded'

    useEffect(() => {
        Axios.get("https://swb-website-api.herokuapp.com/api/getall").then((response) => {
            getStoryList(response.data)
        })
    }, []);

    const refreshPage = ()=>{
        window.location.reload();
    }

    const deleteDescription = (story) => {
        Axios.delete(`https://swb-website-api.herokuapp.com/api/delete/${story}`)
        refreshPage();
    };

    const updateDescription = (story) => {
        Axios.put("https://swb-website-api.herokuapp.com/api/update", {
            storyTitle: story,
            storyDescription: newDesc
        });
        setNewDesc("")
        refreshPage();
    };

    return (
        <div>
            <h1>
                BOOK REPOSITORY
            </h1>
            <hr className="rounded"/>
            <p>
                {storyList.map((val) => {
                    return <div className="form">
                        <h1>
                            {val.title}
                        </h1>
                        <h2>Description:</h2>
                        <p>
                            {val.description}
                        </p>
                        <h3>
                            Rating:
                        </h3>
                        <p>
                            {val.rating}
                        </p>

                        <input type="text" placeholder="Write a new description here..." id="updateInput" onChange={(e) => {
                            setNewDesc(e.target.value)
                        }
                        }/>
                        <br/>
                        <div className="button">
                            <button onClick={() => {updateDescription(val.title)}}>Update description</button>
                        </div>
                        <br/>
                        <br/>
                        <div className="button">
                            <button onClick={() => {deleteDescription(val.title)}}>Delete story</button>
                        </div>
                        <hr className="rounded"/>
                    </div>
                })}
            </p>
        </div>
    );
}
export default withRouter(MainPage);