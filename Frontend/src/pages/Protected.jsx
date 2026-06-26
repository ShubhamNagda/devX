import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

const Protected = ({ Cmp }) => {
  const [, setUser] = useContext(UserContext);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
  try {
    const response = await axios.get(
      `${import.meta.env.VITE_API_URL_USERS}/me`,
      {
        withCredentials: true,
      }
    );

    setUser(response.data.data);
  } catch (error) {
    if (error.response?.status === 401) {
      try {
        await axios.post(
          `${import.meta.env.VITE_API_URL_USERS}/refresh-token`,
          {},
          {
            withCredentials: true,
          }
        );

        const response = await axios.get(
          `${import.meta.env.VITE_API_URL_USERS}/me`,
          {
            withCredentials: true,
          }
        );

        setUser(response.data.data);
      } catch {
        navigate("/login", { replace: true });
      }
    } else {
      navigate("/login", { replace: true });
    }
  } finally {
    setLoading(false);
  }
};
fetchUser()
  }, [navigate, setUser]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return <Cmp />;
};

export default Protected;