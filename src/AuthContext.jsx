import axios from "axios";
import React , {createContext, useState, useEffect, Children, useContext } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const AuthProvider = ({children}) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [queuedAction, setQueuedAction] = useState(null); 
    const navigate = useNavigate();
    useEffect( () => {

        //check token in local storage
        const token = localStorage.getItem('token');
        // if found 
        if (token) {
            axios.get(`${SERVER_URL}profile`, {
              headers: { Authorization: token },
            })
              .then((response) => {
                setUser(response.data.user);
                setLoading(false);
              })
              .catch(() => {
                setLoading(false);
              });
          } else {
            setLoading(false);
          }

    },[]);

    const login = (token, user) => {
      console.log("inside login action");
        localStorage.setItem('token',token);
        setUser(user);


        if (queuedAction) {
          queuedAction();
          setQueuedAction(null);  // Clear the queued action
        }

        
    }

    const logout = (token,user) => {
      console.log("inside logout action");
        localStorage.removeItem('token');
        setUser(null);
    }

    const enqueueAction = (action) => {
      setQueuedAction(() => action);  // Save the action to be executed after login
      navigate('/login');  // Redirect to login page
    };

    return (
        <AuthContext.Provider value = { { user,loading,login,logout,enqueueAction}} >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContext;

export const useAuth = () => {
    return useContext(AuthContext);

}