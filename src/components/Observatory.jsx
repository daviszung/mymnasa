"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observatory = void 0;
const react_1 = require("react");
function Observatory({ env }) {
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
    return (<div>
      <button onClick={() => getImage()}>Get Image</button>
      {url ? (<img src={url} alt="Fetched Image"/>) : (<span>Loading image...</span>)}
      <p>{nasaData}</p>
    </div>);
}
exports.Observatory = Observatory;
;
