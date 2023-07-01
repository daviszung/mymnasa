import React from "react"
import { useState, useEffect } from "react"
import { Observatory } from "./Observatory";
import { Signin } from "./Signin";


export function App(){
  const [env, setEnv] = useState<string>();
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  useEffect(() => {
    fetch('/api/env')
      .then(response => response.json())
      .then(data => setEnv(data))
      .catch(error => console.error('Error fetching config:', error));
  },[])

  return (
    <div id="app">
      {loggedIn ? <Observatory env={env} setLoggedIn={setLoggedIn}/> : <Signin env={env} setLoggedIn={setLoggedIn}/>}
    </div>
  )
};
