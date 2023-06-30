import React from "react"
import { useState } from "react"


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
  const [url, setUrl] = useState()

  async function getImage() {
    const response = await fetch("https://mymnasa.vercel.app:3000/api/image");
    const data = await response.json()
    console.log(data);
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
