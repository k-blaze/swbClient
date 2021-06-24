import React, {useEffect, useState} from "react";
import Axios from "axios";
import "../App.css";
import {withRouter} from "react-router-dom";

function AddStory() {

    const [storyTitle, setTitle] = useState('');
    const [storyDescription, setDescription] = useState('');
    const [storyRating, setStoryRating] = useState('');
    const [uploadStatus, setUploadStatus] = useState('');

    const submitDescription = () => {
        Axios.post("https://swb-website-api.herokuapp.com/api/insert", {
            storyTitle: storyTitle,
            storyDescription: storyDescription,
            storyRating: storyRating
        }).then((response) => {
            setUploadStatus(response.data.message);
        });
    };

    return(
        <div className="form">
            <label>Story Title:</label>
            <br/>
            <input type="text" name="storyName" onChange={(e) => {
                setTitle(e.target.value)
            }} />
            <br/>
            <label>Review:</label>
            <br/>
            <input type="text" name="review" onChange={(e) => {
                setDescription(e.target.value)
            }} />
            <br/>
            <label>Rating:</label>
            <br/>
            <input type="text" name="rating" onChange={(e) => {
                setStoryRating(e.target.value)
            }} />
            <br/>
            <div className="button">
                <button onClick={submitDescription}>Submit</button>
            </div>
            <h2> {uploadStatus} </h2>
        </div>
    );
}

export default withRouter(AddStory);