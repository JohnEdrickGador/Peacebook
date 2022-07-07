import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";

export default function Home() {
    const navigate = useNavigate();

    let signup = (e) => {
        e.preventDefault();

        const user = {
            firstname: document.getElementById('fname').value,
            lastname: document.getElementById('lname').value,
            email: document.getElementById('s-email').value,
            password: document.getElementById('s-password').value
        }
        //send a POST request to localhost:3001/signup
        fetch(
            "http://localhost:3001/signup",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(body => {
              if (body.success) { alert("Successfully saved user"); }
              else { alert("Failed to save user"); }
            });
    }
    let login = (e) => {
        e.preventDefault();
        const credentials = {
            email : document.getElementById("l-email").value,
            password : document.getElementById("l-password").value
        }
        //send POST request
        fetch(
            "http://localhost:3001/login",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify(credentials)
            })

            .then(response => response.json())
            .then(body => {
              if (body.success) { 
                //store token as a cookie
                const cookies = new Cookies();
                cookies.set(
                    "authToken",
                    body.token,
                    {
                        path:"localhost:3001/",
                        age: 60*60,
                        sameSite:"lax" 
                    });

                localStorage.setItem("username", body.username);
                alert("Successfully logged in");
                navigate("/dashboard");
               }
              else { alert("Double check your credentials"); }
            });
    }

    return(
        <div>
            <h2>Sign Up</h2>
            <form>
                <input type="text" placeholder="First Name" id='fname'></input>
                <input type="text" placeholder="Last Name" id='lname'></input>
                <input type="text" placeholder="Email" id='s-email'></input>
                <input type="password" placeholder='Password' id='s-password'></input>
                <button id='signup' onClick={signup}>Sign Up</button>
            </form>

            <h2>Log in</h2>
            <form>
                <input type="text" placeholder="Email" id='l-email'></input>
                <input type="password" placeholder='Password' id='l-password'></input>
                <button id='login' onClick={login}>Log In</button>
            </form>
        </div>
    )
}