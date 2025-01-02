import React  , {useContext, useState} from "react";
import AuthContext, { useAuth } from "../AuthContext.jsx";
import axios from "axios";
import { useLocation, useNavigation } from "react-router-dom";

const Login = () =>{
    const { login }  = useAuth();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [error,setError] = useState('');
    const location = useLocation();
    const navigate = useNavigation();

    const handleLogin = async (e) => {
        e.preventDefault();
        try{
        const response = await axios.post('http://localhost:5000/login',{email,password});
        const {token, user} = response.data;
        login(token,user);
        }
        catch(err){
            setError(err.response.data.message || "Login failed");
        }

            // Redirect to the page the user was trying to access before login
        const from = location.state?.from || '/';  // Default to home if no previous location
        navigate(from);  // Navigate to the `from` location or default to home

    }

    return (
    <div>
        <h1>LOGIN</h1>
        <form onSubmit={handleLogin}>
            <label htmlFor="email">Enter the email:</label>
            <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
             <label htmlFor="password">Enter Password:</label>
            <input id="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
            <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
    </div>
    );
}

export default Login;