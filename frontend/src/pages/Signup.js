import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Signup() {
    //for redirecting
    const navigate = useNavigate();
    // form validation
    var isFnameValid = false;
    var isLnameValid = false;
    var isEmailValid = false;
    var isPasswordValid = false;
    var isPasswordMatch = false;
    //onChange event
    let onChangeFName = (e) => {
      // var errorList = document.getElementById('errors-list');
      // var field = e.target.placeholder;
      // var identify = e.target.id;
      if (e.target.value === '' ||e.target.value == null) {
        // var error = document.createElement('li');
        // error.setAttribute('id',`${identify}-s`);
        // error.appendChild(document.createTextNode(field + " cannot be blank"));
        // errorList.appendChild(error);
        isFnameValid = false;
      }
      else {
        isFnameValid = true;
        // if (errorList.querySelector(`#${identify}-s`) !== null) {
        //   var error = document.getElementById(`${identify}-s`);
        //   errorList.removeChild(error);
        //   console.log("should be cleared");
        }
      }


    let onChangeLName = (e) => {
      // var errorList = document.getElementById('errors-list');
      // var field = e.target.placeholder;
      // var identify = e.target.id;
      if (e.target.value === '' ||e.target.value == null) {
        isLnameValid = false;
        // var error = document.createElement('li');
        // error.setAttribute('id',`${identify}-s`);
        // error.appendChild(document.createTextNode(field + " cannot be blank"));
        // errorList.appendChild(error);
      }
      else {
        isLnameValid = true;
        // if (errorList.querySelector(`#${identify}-s`) !== null) {
        //   var error = document.getElementById(`${identify}-s`);
        //   errorList.removeChild(error);
        //   console.log("should be cleared");
        }
      }
    

    let onChangeEmail = (e) => {
      var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
      var emailInput = e.target.value;

      if (emailInput.match(validRegex)) {
        isEmailValid = true;
      }
      else{
        isEmailValid = false;
      }
      console.log(isEmailValid);

    }

      
    let onKeyupPassword = (e) => {
      var isNum = false;
      var isUpper = false;
      var isLower = false;
      var isLong = false;
      var numbers = /[0-9]/g;
      var uppercase = /[A-Z]/g;
      var lowercase = /[a-z]/g;
      let crit1 = document.getElementById('char-length');
      let crit2 = document.getElementById('number');
      let crit3 = document.getElementById('lowercase');
      let crit4 = document.getElementById('uppercase');
      var inputChar = e.target.value;
      if (inputChar.length > 0) {
        document.getElementById('r-password').disabled = false;
      } else {
        document.getElementById('r-password').disabled = true;
      }
      if (inputChar.match(numbers)) {
        crit2.classList.remove('invalid');
        crit2.classList.add('valid');
        isNum = true;
      }
      else{
        crit2.classList.remove('valid');
        crit2.classList.add('invalid');
        isNum = false;
      }

      if (inputChar.match(lowercase)) {
        crit3.classList.remove('invalid');
        crit3.classList.add('valid');
        isLower = true;
      }
      else{
        crit3.classList.remove('valid');
        crit3.classList.add('invalid');
        isLower = false;
      }

      if (inputChar.match(uppercase)) {
        crit4.classList.remove('invalid');
        crit4.classList.add('valid');
        isUpper = true;
      }
      else{
        crit4.classList.remove('valid');
        crit4.classList.add('invalid');
        isUpper = false;
      }

      if(inputChar.length >=8 ){
        crit1.classList.remove('invalid');
        crit1.classList.add('valid');
        isLong = true;
      }
      else{
        crit1.classList.remove('valid');
        crit1.classList.add('invalid');
        isLong = false;
      }

      if (isNum === true && isUpper === true && isLower === true && isLong === true) {
        isPasswordValid = true;
      }
      else{
        isPasswordValid = false;
      }
    }

    let matchPassword = (e) => {
      var initial = document.getElementById('s-password').value;
      var final = e.target.value;
      if (final === initial) {
        isPasswordMatch = true;
      }
      else{
        isPasswordMatch = false;
      }
    }

    let verify = (e) => {
      if (isFnameValid === true && isLnameValid === true && isEmailValid === true && isPasswordValid === true && isPasswordMatch === true) {
        document.getElementById('signup').disabled = false;
      } else {
        document.getElementById('signup').disabled = true;
      }
    }

    let signup = (e) => {
      e.preventDefault();
      if (isFnameValid === true && isLnameValid === true && isEmailValid === true && isPasswordValid === true && isPasswordMatch === true){
        console.log(`${isFnameValid} ${isLnameValid} ${isEmailValid} ${isPasswordMatch} ${isPasswordValid}`)
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
            if (body.success) { 
              alert("Successfully saved user"); 
              navigate("/login") 
            }
            else { alert("Failed to save user"); }
          });
      }
      else{
        alert("Please review your inputs");
      }
        
    }

    let passwordFocus = () => {
      const errorList = document.getElementById('errors-list');
      errorList.style.opacity = 1;
    }
    
    let passwordBlur = () => {
      const errorList = document.getElementById('errors-list');
      errorList.style.opacity = 0;
    }

    return (
      <div>
        <div className='signup-container'>
            <h2>Sign Up</h2>
            <form className='signup-form'>
                <input type="text" placeholder="First Name" id='fname' required onChange={onChangeFName} ></input>
                <input type="text" placeholder="Last Name" id='lname' required onChange={onChangeLName} ></input>
                <input type="text" placeholder="Email" id='s-email' required onChange={onChangeEmail} ></input>
                <input type="password" placeholder='Password' id='s-password' required onKeyUp={onKeyupPassword} onFocus={passwordFocus} onBlur={passwordBlur}></input>
                <input type="password" placeholder='Repeat Password' id='r-password' required onChange={matchPassword} disabled></input>
                <button id='signup' onClick={signup} type="submit">Sign Up</button>
            </form>
            <div className='error-div' id='errors-list'>
            <h3>Errors:</h3>
            <ul>
              <li className='invalid' id='char-length'>8 or more characters</li>
              <li className='invalid' id='uppercase'>atleast 1 uppercase letter</li>
              <li className='invalid' id='lowercase'>lowercase letteratleast 1 lowercase letter</li>
              <li className='invalid' id='number'>atleast 1 number</li>
            </ul>
            </div>
        </div>
      </div>
        
    )
}
