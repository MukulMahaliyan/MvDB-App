import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SERVER_URL = import.meta.env.VITE_SERVER_URL;


const Register = () => {
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [confirmationPassword,setConfirmationPassword] = useState('');
    const [passwordMismatch,setPasswordMismatch] = useState(false);
    const [error,setError] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        if(confirmationPassword &&  password && password!=confirmationPassword){
          setPasswordMismatch(true);  
        }
        else{
            setPasswordMismatch(false);
        }
    },[confirmationPassword,password]);

    const handleRegister = async (e) => {
        e.preventDefault();
           try{
                console.log(`Making api request to this url: ${SERVER_URL}register`);
                const response = await axios.post(`${SERVER_URL}register`,{email,password});
             //   const {token, user} = response.data;
                console.log(response.data.message);
                alert(`Registration succesful, Now you can login`);
                navigate('/login');  // Navigate
             }
                catch(err){
                 
                    setError(err.response.message || "Registration failed");
                }

    }
    
  return (
    <div>
        <h1>Register</h1>
        <form onSubmit={handleRegister}>
            <label htmlFor="email">Enter the email:</label>
            <input required id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
             <label htmlFor="password">Enter Password:</label>
            <input required id="password" type="password" value={password} onChange={(e)=> setPassword(e.target.value)}></input>
            <label htmlFor="confirmpassword">Confirm Password:</label>
            <input required id="confirmpassword" type="password" value={confirmationPassword} onChange={(e)=> setConfirmationPassword(e.target.value)}></input>
            <button type="submit">Register</button>
        </form>
        {passwordMismatch && <p>Oppss... Password doesnt match!!!</p>}
        {error && <p>{error}</p>}
    </div>
    );
  
}

export default Register
