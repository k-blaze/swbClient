import './App.css';
import './Style.css';
import React, {useEffect, useState} from "react";
import {BrowserRouter as Router, Link, Route} from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import MainPage from "./pages/MainPage";
import AddStory from "./pages/AddStory";
import Leaderboard from "./pages/Leaderboard";
import UserPage from "./pages/UserPage";
import Registration from "./pages/Registration";
import Axios from "axios";
import FindBook from "./pages/FindBook";
import ContactForm from "./pages/ContactForm";


function App() {
    const [isAuth, setIsAuth] = useState();

    Axios.defaults.withCredentials = true
    const [usernameLog, setUsernameLog] = useState("")
    const [passwordLog, setPasswordLog] = useState("")
    const [loginStatus, setLoginStatus] = useState("")


    useEffect(() => {
        Axios.get("https://swb-website-api.herokuapp.com/api/login").then((response) => {
            if(response.data.loggedIn === true) {
                setLoginStatus(response.data.user[0].username);
            }
        })
    }, []);

    const LoginUser = () => {
        Axios.post("https://swb-website-api.herokuapp.com/api/login", {
            usernameLog: usernameLog,
            passwordLog: passwordLog
        }).then((response) => {
            if(response.data.message) {
                setLoginStatus(response.data.message)
                setIsAuth(false);
            }else {
                setLoginStatus("Hello " + response.data[0].username);
                setIsAuth(true);
                localStorage.setItem("isAuth", usernameLog);
            }
        });
    };

    return (
        <div className="App">
            <div className="container">
                <Router>

                    <div className="header">
                        Books and wonders!
                    </div>

                    <div className="navbar">
                        <ul>
                            <Link to = "/home">Homepage</Link>
                            <Link to = "/leaderboard">Leaderboard</Link>
                            <Link to = "/addstory">Add Book</Link>
                            <Link to = "/search">Search for story</Link>
                            <Link to = "/profile">Your profile</Link>
                        </ul>
                        <div className="box-1">
                            <div className="btn btn-one">
                                <button onClick={() => {
                                    setIsAuth(false);
                                    setLoginStatus("Logged out!");
                                    localStorage.clear();
                                }}>LOGOUT</button>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        <div className="side">
                            <h1>Purpose of this site</h1>
                            <p>The purpose of this site is to store data about books, such as their title and rating.</p>
                            <p>Whoever has access to the site can either change the description of the books or delete them.</p>
                            <p>In order to gain access you need to register and log into your account, it's that simple!</p>
                            <p>Once that's done, you can also add new books to the database.</p>
                            <img src="https://acegif.com/wp-content/gifs/book-95.gif" alt=":(" width="200" height="200"/>
                        </div>
                        <div className="main">
                            <div className="card">
                                <Route path = "/" exact>
                                    <h1>Login</h1>
                                    <h2>You need to login if you want to view the content of the site</h2>
                                    <p>If you don't have an account please use the register form</p>
                                    <div className="form">
                                        <label>Username:</label>
                                        <br/>
                                        <input type="text" placeholder="Username..." onChange={(e) => {
                                            setUsernameLog(e.target.value);
                                        }}/>
                                        <br/>
                                        <label>Password:</label>
                                        <br/>
                                        <input type="password" placeholder="Password..." onChange={(e) => {
                                            setPasswordLog(e.target.value);
                                        }}/>
                                        <br/>
                                        <br/>
                                        <button onClick={LoginUser}>Submit</button>
                                    </div>
                                    <h1>{loginStatus}</h1>
                                    <hr className="rounded"/>
                                    <hr className="rounded"/>
                                    <Registration/>
                                </Route>
                                <ProtectedRoute path = "/home" component={MainPage} isAuth={isAuth}/>
                                <ProtectedRoute path = "/leaderboard" component={Leaderboard} isAuth={isAuth}/>
                                <ProtectedRoute path = "/addstory" component={AddStory} isAuth={isAuth}/>
                                <ProtectedRoute path = "/search" component={FindBook} isAuth={isAuth}/>
                                <ProtectedRoute path = "/profile" component={UserPage} isAuth={isAuth}/>
                            </div>
                        </div>
                    </div>
                    <div className="footer">
                        <h1>Thank you for visiting my site!</h1>
                        <h2>Here you can message me if you have any questions or suggestions:</h2>
                        <ContactForm />
                        <br/>
                    </div>
                </Router>
            </div>
        </div>
    )
}

export default App;