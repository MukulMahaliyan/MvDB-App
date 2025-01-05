import React  , {useContext, useState} from "react";
import AuthContext, { useAuth } from "../AuthContext.jsx";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const Login = () =>{
    const { login }  = useAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post(`${SERVER_URL}login`,{email,password});
        const {token, user} = response.data;
        console.log(token);
        console.log(user);
        login(token,user);
        alert("Succesfully logged in");
        }
        catch(err){
            console.log("error: "+ err);
           // setError(err.data.message || "Login failed");
        }

            // Redirect to the page the user was trying to access before login
        const from = location.state?.from || '/';  // Default to home if no previous location
        navigate(from);  // Navigate to the `from` location or default to home

    }
    const handleNavigateToRegister  = () => {
        navigate('/register');
    }

    return (
    <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Enter the email:</label>
            <input required id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
             <label htmlFor="password">Enter Password:</label>
            <input required id="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
            <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        <label htmlFor="registerButton">Dont have an account??</label>
        <button id="registerButton" onClick={handleNavigateToRegister}>Register Here</button>
    </div>
    );
}

export default Login;