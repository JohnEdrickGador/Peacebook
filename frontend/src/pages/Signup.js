import React from 'react';

export default function Signup() {
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

    return (
        <div>
            <h2>Sign Up</h2>
            <form>
                <input type="text" placeholder="First Name" id='fname'></input>
                <input type="text" placeholder="Last Name" id='lname'></input>
                <input type="text" placeholder="Email" id='s-email'></input>
                <input type="password" placeholder='Password' id='s-password'></input>
                <button id='signup' onClick={signup}>Sign Up</button>
            </form>
        </div>
    )
}