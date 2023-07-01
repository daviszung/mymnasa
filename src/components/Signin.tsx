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

    response = await response.json();

    if (response === "Login Success") {
      setLoggedIn(true)
    } else {
      alert(response);
    }

    return
  };
  
  return (
    <div>
      <input id="username" type="text" placeholder="username" minLength={5}></input>
      <input id="password" type="password" placeholder="password" minLength={5}></input>
      <button onClick={() => sendAccountInfo("login")}>Login</button>
      <button onClick={() => sendAccountInfo("register")}>Create Account</button>
    </div>
  )
};
