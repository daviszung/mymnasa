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
    const [env, setEnv] = (0, react_2.useState)();
    (0, react_2.useEffect)(() => {
        fetch('/api/env')
            .then(response => response.json())
            .then(data => setEnv(data))
            .catch(error => console.error('Error fetching config:', error));
    }, []);
    async function getImage() {
        const fetchURL = env === "prod" ? "http://mymnasa.vercel.app/api/image" : "http://localhost:3000/api/image";
        const response = await fetch(fetchURL);
        const data = await response.json();
        setNasaData(prevState => ({ ...prevState, data }));
        setUrl(data.url);
    }
    return (<div>
      <button onClick={() => getImage()}>Get New Image</button>
      {url ? (<img src={url} alt="Fetched Image"/>) : (<span>Loading image...</span>)}
    </div>);
}
exports.App = App;
;
