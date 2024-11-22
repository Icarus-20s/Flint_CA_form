import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../Api/api";
import {useAuth} from "../../Context/AuthContextProvider";
import "../Login/Login.css";
import KeyboardBackspaceRoundedIcon from '@mui/icons-material/KeyboardBackspaceRounded';

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/login/", { email, password });
      if (response.status === 200) {
        console.log(response)
        auth.login(response.data.user,response.data.token,response.data.role);
        navigate("/",{replace:true});
      }
    } catch (error) {
      setError("Login Failed. Please check your email and password.");
      console.error("Login Failed:", error);
    }
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="form-group">
          <button type="submit" className="login-button">
            Login
          </button>
        </div>
      </form>
      <button className="home-screen" onClick={()=>{
        navigate('/')
      }}>Go Back To Home Screen<KeyboardBackspaceRoundedIcon /></button>
    </div>
  );
};

export default Login;