import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(true);

  const refreshAuth = async () => {
    try {
      const res = await axios.get('http://localhost:3000/user/me', { withCredentials: true });
      setLoggedIn(res.data.loggedIn);
      setUsername(res.data.username || '');
    } catch {
      setLoggedIn(false);
      setUsername('');
    } finally {
      setLoading(false);
    }
  };
  const logOut = async () => {
    try {
      await axios.post('http://localhost:3000/user/logout', {}, { withCredentials: true });
    } finally {
      setLoggedIn(false);
      setUsername('');
    }
  };

  useEffect(() => {
    refreshAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn, username, setUsername, refreshAuth, loading, logOut}}>
      {children}
    </AuthContext.Provider>
  );
};
