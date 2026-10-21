
import { useState } from "react";
import { Users, LockKeyhole, Mail } from "lucide-react";
import "../App.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  function handleLogin(event) {
    event.preventDefault();

    if (!email.trim() || !password.trim()) {
      setMessage("Please enter your email and password.");
      return;
    }

    setMessage("Login form submitted successfully!");
  }

  return (
    <div className="login-page">
      <form className="login-card" onSubmit={handleLogin}>
        <div className="login-logo">
          <Users size={30} />
        </div>

        <h1>PeoplePulse</h1>
        <p className="login-subtitle">Employee Management Portal</p>

        <label htmlFor="login-email">Email Address</label>
        <div className="login-input">
          <Mail size={18} />
          <input
            id="login-email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </div>

        <label htmlFor="login-password">Password</label>
        <div className="login-input">
          <LockKeyhole size={18} />
          <input
            id="login-password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
          />
        </div>

        <button type="submit" className="login-button">
          Sign In
        </button>

        {message && <p role="status" className="login-message">{message}</p>}

        <p className="login-footer">
          Employee Management Dashboard
        </p>
      </form>
    </div>
  );
}

export default Login;
