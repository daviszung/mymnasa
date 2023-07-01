"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const react_1 = __importDefault(require("react"));
const react_2 = require("react");
const Observatory_1 = require("./Observatory");
const Signin_1 = require("./Signin");
function App() {
    const [env, setEnv] = (0, react_2.useState)();
    const [loggedIn, setLoggedIn] = (0, react_2.useState)(false);
    (0, react_2.useEffect)(() => {
        fetch('/api/env')
            .then(response => response.json())
            .then(data => setEnv(data))
            .catch(error => console.error('Error fetching config:', error));
    }, []);
    return (<div>
      {loggedIn ? <Observatory_1.Observatory env={env}/> : <Signin_1.Signin env={env} setLoggedIn={setLoggedIn}/>}
    </div>);
}
exports.App = App;
;
