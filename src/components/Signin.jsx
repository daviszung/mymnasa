"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signin = void 0;
const google_1 = require("@react-oauth/google");
function getDocumentInfo() {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    if (username.value.length < 5) {
        alert("Username must have length of 5 or more");
        return false;
    }
    if (password.value.length < 5) {
        alert("Password must have length of 5 or more");
        return false;
    }
    return JSON.stringify({ username: username.value, password: password.value });
}
;
function Signin({ env, setLoggedIn }) {
    async function sendAccountInfo(mode) {
        const docInfo = getDocumentInfo();
        if (!docInfo)
            return;
        const fetchURL = `${env === "prod"
            ? "https://mymnasa.vercel.app/api/" + mode
            : "http://localhost:3000/api/" + mode}`;
        let response = await fetch(fetchURL, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: docInfo
        });
        try {
            response = await response.json();
        }
        catch (err) {
            console.log("ERROR", err);
        }
        if (response === "Login Success") {
            setLoggedIn(true);
        }
        else {
            alert(response);
        }
        return;
    }
    ;
    return (<div id='signin'>
      <div className='loginContainer'>
        <div className='inputContainer'>
          <input id="username" type="text" placeholder="username" autoComplete='off'></input>
          <input id="password" type="password" placeholder="password"></input>
        </div>
        <div className='accountBtnsContainer'>
          <button onClick={() => sendAccountInfo("login")}>Login</button>
          <button onClick={() => sendAccountInfo("register")}>Create Account</button>
        </div>
        <div>
          <google_1.GoogleLogin onSuccess={() => {
            setLoggedIn(true);
            console.log("SUCCESSFUL LOGIN WITH GOOGLE");
        }} onError={() => {
            console.log("LOGIN FAILED");
        }}/>
        </div>
      </div>
    </div>);
}
exports.Signin = Signin;
;
