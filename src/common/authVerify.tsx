import { useEffect } from "react";
import { useLocation } from "react-router-dom";


const AuthVerify = (props: any) => {
  let location = useLocation();

  const parseJwt = (token: string) => {
    try {
      return JSON.parse(atob(token.split(".")[1]));
    } catch (e) {
      return null;
    }
  };

  useEffect(() => {
    const handleLogInSession = () => {
      const user = localStorage.getItem("user");
      if (user !== null) {
        const decodedJwt = parseJwt(JSON.parse(user).accessToken);
  
        if (decodedJwt.exp * 1000 < Date.now()) {
          props.logOut();
        }
      }
    }
    handleLogInSession();
  }, [location, props]);

  return <div></div>;
};

export default AuthVerify;