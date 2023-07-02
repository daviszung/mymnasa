import { useState } from "react";
import { googleLogout } from "@react-oauth/google";


type ObservatoryProps = {
  env: string | undefined;
  setLoggedIn: Function;
}

export function Observatory({ env, setLoggedIn }: ObservatoryProps){
  const [nasaData, setNasaData] = useState<string>();
  const [url, setUrl] = useState<string>();

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

    setNasaData(data.explanation);
    setUrl(data.url);
  };
  
  return (
    <>
    <button className="logoutBtn" onClick={() => {
          console.log("LOGGING OUT OF GOOGLE OAUTH");
          googleLogout()
          setLoggedIn(false)
        }}>Logout</button>
    <div id="observatory">
      <button onClick={() => getImage()}>Get Image</button>
      <div className="theaterContainer">
        <div>
          {url ? (
          <img src={url} alt="Fetched Image" />
        ) : (
          <div>No Image...</div>
        )}
        </div>
        {nasaData && <p className="description">{nasaData}</p>}
      </div>
      
    </div>
    </>
    
  )
};
