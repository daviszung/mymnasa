"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
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
    return { username: username.value, password: password.value };
}
;
function App() {
    const [nasaData, setNasaData] = (0, react_2.useState)({});
    const [url, setUrl] = (0, react_2.useState)();
    const [env, setEnv] = (0, react_2.useState)();
    (0, react_2.useEffect)(() => {
        fetch('/api/env')
            .then(response => response.json())
            .then(data => setEnv(data))
            .catch(error => console.error('Error fetching config:', error));
    }, []);
    async function getImage() {
        const fetchURL = env === "prod"
            ? "https://mymnasa.vercel.app/api/image"
            : "http://localhost:3000/api/image";
        const response = await fetch(fetchURL, {
            method: "GET",
            headers: {
                "Access-Control-Allow-Origin": "*"
            }
        });
        const data = await response.json();
        setNasaData(prevState => ({ ...prevState, data }));
        setUrl(data.url);
    }
    ;
    async function login() {
    }
    ;
    async function createAccount() {
        let docInfo = getDocumentInfo();
        if (!docInfo) {
            console.log("get document info returned false");
            return;
        }
        docInfo = JSON.stringify(docInfo);
        const fetchURL = env === "prod"
            ? "https://mymnasa.vercel.app/api/register"
            : "http://localhost:3000/api/register";
        let response = await fetch(fetchURL, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: docInfo
        });
        await response.json();
        console.log(response);
    }
    ;
    return (<div>
      <input id="username" type="text" placeholder="username" minLength={5}></input>
      <input id="password" type="password" placeholder="password" minLength={5}></input>
      <button onClick={() => getImage()}>Get New Image</button>
      <button onClick={() => login()}>Login</button>
      <button onClick={() => createAccount()}>Create Account</button>
      {url ? (<img src={url} alt="Fetched Image"/>) : (<span>Loading image...</span>)}

    </div>);
}
exports.App = App;
;
