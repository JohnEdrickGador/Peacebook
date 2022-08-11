import React from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from "universal-cookie";


export default function Login() {
    const navigate = useNavigate();

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
                localStorage.setItem("userId", body.id);
                alert("Successfully logged in");
                navigate("/home");
               }
              else { alert("Double check your credentials"); }
            });
    }

    return(
        <div className='container'>
            <h2>LOGIN</h2>
            <form className='login-form'>
                <input type="text" placeholder="Email" id='l-email'></input>
                <input type="password" placeholder='Password' id='l-password'></input>
                <button id='login' onClick={login}>LOGIN</button>
                <p>Dont't have an account? <a href="/signup">signup here!</a></p>
            </form>
        </div>
    )
}