"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observatory = void 0;
const react_1 = require("react");
const google_1 = require("@react-oauth/google");
function Observatory({ env, setLoggedIn }) {
    const [nasaData, setNasaData] = (0, react_1.useState)();
    const [url, setUrl] = (0, react_1.useState)();
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
    }
    ;
    return (<>
    <button className="logoutBtn" onClick={() => {
            console.log("LOGGING OUT OF GOOGLE OAUTH");
            (0, google_1.googleLogout)();
            setLoggedIn(false);
        }}>Logout</button>
    <div id="observatory">
      <button onClick={() => getImage()}>Get Image</button>
      <div className="theaterContainer">
        <div>
          {url ? (<img src={url} alt="Fetched Image"/>) : (<div>No Image...</div>)}
        </div>
        {nasaData && <p className="description">{nasaData}</p>}
      </div>
      
    </div>
    </>);
}
exports.Observatory = Observatory;
;
