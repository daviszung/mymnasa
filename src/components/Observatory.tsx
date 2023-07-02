import React, { useState } from "react";
import { googleLogout } from "@react-oauth/google";


type ObservatoryProps = {
  env: string | undefined;
  setLoggedIn: Function;
}

const isValidDate = (date: Date) => {
  return !isNaN(date.getTime());
};

const isDateNotAfterToday = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today;
};

export function Observatory({ env, setLoggedIn }: ObservatoryProps){
  const [nasaData, setNasaData] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [selectedDate, setSelectedDate] = useState<string>();

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  async function getImage() {
    if (typeof selectedDate !== "string") return;
    const inputDate = new Date(selectedDate);
    if (!isValidDate(inputDate) || !isDateNotAfterToday(inputDate)) return;

    const fetchURL = env === "prod"
    ? "https://mymnasa.vercel.app/api/image" 
    : "http://localhost:3000/api/image";

    const response = await fetch(fetchURL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({selectedDate})
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
      <div className="controlsContainer">
        <input type="date" className="inputDate" value={selectedDate} onChange={handleDateChange} />
        <button onClick={() => getImage()}>Get Image</button>
      </div>
      <div className="theaterContainer">
        <div className="imgContainer">
          {url ? (
          <img src={url} className="nasaImg" alt="Fetched Image" />
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
