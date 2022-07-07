import React from "react";
import { Navigate } from "react-router-dom";
import Cookies from "universal-cookie";

class Dashboard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            checkedifLoggedIn: false,
            isLoggedIn: null,
            username: localStorage.getItem('username'),
        }
        this.logout = this.logout.bind(this);
    }

    logout(e) {
        e.preventDefault();

        console.log("User logged out successfully");
        //Delete cookie with Auth Token
        const cookies = new Cookies();
        cookies.remove("authToken");

        // Delete username in local storage
        localStorage.removeItem("username");

        this.setState({ isLoggedIn: false });
        
    }

    componentDidMount() {
    //send POST request to check if user is looged in
    fetch("http://localhost:3001/checkifloggedin",
      {
        method: "POST",
        credentials: "include"
      })
      .then(response => response.json())
      .then(body => {
        if (body.isLoggedIn) {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: true, username: localStorage.getItem("username")});
        } else {
          this.setState({ checkedIfLoggedIn: true, isLoggedIn: false });
        }
      });
    }

    render() {
        if(!this.state.checkedIfLoggedIn) {
            //delay redirect
            return(<div></div>)
        }
        else{
            if(this.state.isLoggedIn) {
                return(
                <div>
                    <h1>Welcome to your dashboard, {this.state.username}</h1>
                    <button id="logout" onClick={this.logout}>Log out</button>
                </div>
                )      
            }
            else{
                //redirect to homepage
                return <Navigate to="/" />
            }
        }
    }
}

export default Dashboard