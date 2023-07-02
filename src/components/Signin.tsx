import { GoogleLogin } from '@react-oauth/google';

type SigninProps = {
  env: string | undefined;
  setLoggedIn: Function;
}

type documentInfo = {
  username: string,
  password: string
} | false | string


function getDocumentInfo() {
  const username = document.getElementById("username") as HTMLInputElement;
  const password = document.getElementById("password") as HTMLInputElement;

  if (username.value.length < 5){
    alert("Username must have length of 5 or more")
    return false;
  }

  if (password.value.length < 5){
    alert("Password must have length of 5 or more")
    return false;
  }

  return JSON.stringify({ username: username.value, password: password.value})
};

export function Signin({ env, setLoggedIn} : SigninProps){

  async function sendAccountInfo(mode: "login" | "register") {

    const docInfo: documentInfo = getDocumentInfo();

    if (!docInfo) return;

    const fetchURL = `${env === "prod" 
      ? "https://mymnasa.vercel.app/api/" + mode
      : "http://localhost:3000/api/" + mode}`

    let response: Response | string = await fetch(fetchURL, {
      method: "POST",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
      },
      body: docInfo
    })

    try {
      response  = await response.json();
    }
    catch (err) {
      console.log("ERROR", err);
    }

    if (response === "Login Success") {
      setLoggedIn(true)
    } else {
      alert(response);
    }

    return
  };
  
  return (
    <div id='signin'>
      <div className='loginContainer'>
        <div className='inputContainer'>
          <input id="username" className="signinInput" type="text" placeholder="username" autoComplete='off'></input>
          <input id="password" className="signinInput" type="password" placeholder="password"></input>
        </div>
        <div className='accountBtnsContainer'>
          <button onClick={() => sendAccountInfo("login")}>Login</button>
          <button onClick={() => sendAccountInfo("register")}>Create Account</button>
        </div>
        <div>
          <GoogleLogin 
            onSuccess={() => {
              setLoggedIn(true)
              console.log("SUCCESSFUL LOGIN WITH GOOGLE");
            }}
            onError={() => {
              console.log("LOGIN FAILED");
            }}
            />
        </div>
      </div>
    </div>
  )
};
