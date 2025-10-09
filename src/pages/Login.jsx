import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

function Login() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("http://localhost:3000/users/sign_in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user: { email, password } })
    });

    if (!res.ok) {
      console.error("Login failed");
      return;
    }

    const data = await res.json();
    const token = res.headers.get("Authorization")?.split(" ")[1];
    login(data.user, token);
  };

  return (
    <div className="container">
      <div>
        <h2>Login</h2>
      </div>
      <div>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email :</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"/>
          <label htmlFor="password">Mot de passe :</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password"/>
          <div>
            <button type="submit">Login</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Login
