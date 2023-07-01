"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Signin = void 0;
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
        if (!docInfo) {
            console.log("get document info returned false");
            return;
        }
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
        response = await response.json();
        if (response === "Login Success") {
            setLoggedIn(true);
        }
        else {
            alert(response);
        }
        return;
    }
    ;
    return (<div>
      <input id="username" type="text" placeholder="username" minLength={5}></input>
      <input id="password" type="password" placeholder="password" minLength={5}></input>
      <button onClick={() => sendAccountInfo("login")}>Login</button>
      <button onClick={() => sendAccountInfo("register")}>Create Account</button>
    </div>);
}
exports.Signin = Signin;
;
