import React, {useEffect, useState} from "react";
import Axios from "axios";
import "../App.css";
import {withRouter} from "react-router-dom";

function FindBook() {

    const [allData,setAllData] = useState([]);
    const [filteredData,setFilteredData] = useState(allData);

    useEffect(() => {
        Axios.get("https://swb-website-api.herokuapp.com/api/getall")
            .then(response => {
                console.log(response.data)
                setAllData(response.data);
                setFilteredData(response.data);
            })
            .catch(error => {
                console.log('Error getting fake data: ' + error);
            })
    }, []);

    const handleSearch = (event) =>{
        let value = event.target.value;
        let result = [];
        console.log(value);
        result = allData.filter((data) => {
            return data.title.search(value) != -1;
        });
        setFilteredData(result);
    }

    return(

        <div className="Results">
            <div className="form">
                <h1>Search story by title:</h1>
                <input type="text" onChange={(event) => handleSearch(event)} />
                <br/><br/>
                {filteredData.map((value,index)=>{
                    return(
                        <div className="search">
                            <div key={value.id}>
                                {value.title}
                                <hr className="rounded"/>
                            </div>
                        </div>

                    )
                })}
            </div>
        </div>
    );
}

export default withRouter(FindBook);