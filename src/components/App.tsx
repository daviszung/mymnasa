import React from "react"
import { useState, useEffect } from "react"

type nasaData = {
  date?: string, 
  explanation?: string, 
  hdurl?: string, 
  media_type?: string, 
  service_version?: string,
  title?:string,
  url?: string,
};

type documentInfo = {
  username: string,
  password: string
} | false | string

function getDocumentInfo() {
  const username = document.getElementById("username") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;

  if (username.value.length < 5){
    alert("Username must have length of 5 or more")
    return false;
  }

  if (password.value.length < 5){
    alert("Password must have length of 5 or more")
    return false;
  }

  return { username: username.value, password: password.value}
};

export function App(){

  const [nasaData, setNasaData] = useState<nasaData>({})
  const [url, setUrl] = useState();
  const [env, setEnv] = useState();

  useEffect(() => {
    fetch('/api/env')
      .then(response => response.json())
      .then(data => setEnv(data))
      .catch(error => console.error('Error fetching config:', error));
  },[])

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

    setNasaData(prevState => ({...prevState, data}));
    setUrl(data.url);
  };



  async function login() {

  };

  async function createAccount() {
    let docInfo: documentInfo = getDocumentInfo();
    if (!docInfo) {
      console.log("get document info returned false");
      return
    }

    docInfo = JSON.stringify(docInfo);

    const fetchURL = env === "prod"
    ? "https://mymnasa.vercel.app/api/register" 
    : "http://localhost:3000/api/register";

    let response: Response | string = await fetch(fetchURL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: docInfo
    })

    response = await response.json();

    if (response === "Account Already Exists"){
      alert("This username has been taken. Try a different username.")
    } else {
      alert("Account Created!")
    };
  };
  
  return (
    <div>
      <input id="username" type="text" placeholder="username" minLength={5}></input>
      <input id="password" type="password" placeholder="password" minLength={5}></input>
      <button onClick={() => getImage()}>Get New Image</button>
      <button onClick={() => login()}>Login</button>
      <button onClick={() => createAccount()}>Create Account</button>
      {url ? (
        <img src={url} alt="Fetched Image" />
      ) : (
        <span>Loading image...</span>
      )}

    </div>
  )
};
