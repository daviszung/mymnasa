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
}


export function App(){

  const [nasaData, setNasaData] = useState<nasaData>({})
  const [url, setUrl] = useState();
  const [env, setEnv] = useState();

  useEffect(() => {
    fetch('/api/env')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        setEnv(data);
      })
      .catch(error => console.error('Error fetching config:', error));


  },[])

  async function getImage() {

    console.log("env: ", env);

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
  }
  
  return (
    <div>
      <button onClick={() => getImage()}>Get New Image</button>
      {url ? (
        <img src={url} alt="Fetched Image" />
      ) : (
        <span>Loading image...</span>
      )}
    </div>
  )
};
