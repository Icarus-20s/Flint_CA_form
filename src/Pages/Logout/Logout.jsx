import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../Context/AuthContextProvider";

const Logout = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    auth.logout();
    navigate('/');
  }, [auth, navigate]);

  return null;
};

export default Logout;