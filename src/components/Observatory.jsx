"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Observatory = exports.isDateNotAfterToday = exports.isValidDate = void 0;
const react_1 = __importStar(require("react"));
const google_1 = require("@react-oauth/google");
const isValidDate = (date) => {
    const minYear = 1993;
    const year = date.getFullYear();
    return !isNaN(date.getTime()) && year > minYear;
};
exports.isValidDate = isValidDate;
const isDateNotAfterToday = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date <= today;
};
exports.isDateNotAfterToday = isDateNotAfterToday;
function Observatory({ env, setLoggedIn }) {
    const [nasaData, setNasaData] = (0, react_1.useState)();
    const [url, setUrl] = (0, react_1.useState)();
    const [selectedDate, setSelectedDate] = (0, react_1.useState)();
    const handleDateChange = (event) => {
        setSelectedDate(event.target.value);
    };
    async function getImage() {
        if (typeof selectedDate !== "string")
            return;
        const inputDate = new Date(selectedDate);
        if (!(0, exports.isValidDate)(inputDate) || !(0, exports.isDateNotAfterToday)(inputDate))
            return;
        const fetchURL = env === "prod"
            ? "https://mymnasa.vercel.app/api/image"
            : "http://localhost:3000/api/image";
        const response = await fetch(fetchURL, {
            method: "POST",
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ selectedDate })
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
      <div className="controlsContainer">
        <input type="date" className="inputDate" value={selectedDate} onChange={handleDateChange}/>
        <button onClick={() => getImage()}>Get Image</button>
      </div>
      <div className="theaterContainer">
        <div className="imgContainer">
          {url ? (<img src={url} className="nasaImg" alt="Fetched Image"/>) : (<div>No Image...</div>)}
        </div>
        {nasaData && <p className="description">{nasaData}</p>}
      </div>
    </div>
    </>);
}
exports.Observatory = Observatory;
;
