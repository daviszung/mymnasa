"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
function App() {
    const [nasaData, setNasaData] = (0, react_2.useState)({});
    const [url, setUrl] = (0, react_2.useState)();
    async function getImage() {
        const response = await fetch("http://localhost:3000/api/image");
        const data = await response.json();
        console.log(data);
        setNasaData(prevState => ({ ...prevState, data }));
        setUrl(data.url);
    }
    return (<div>
      <button onClick={() => getImage()}>HELOOOOOOOOOOOOOOOOOOO</button>
      {nasaData ? (<img src={url} alt="Fetched Image"/>) : (<span>Loading image...</span>)}
    </div>);
}
exports.App = App;
;
