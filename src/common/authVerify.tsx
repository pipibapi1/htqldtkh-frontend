import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

const AuthVerify = (props: any) => {
  let location = useLocation();

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (user !== null) {
      const decodedJwt = parseJwt(JSON.parse(user).accessToken);

      if (decodedJwt.exp * 1000 < Date.now()) {
        props.logOut();
      }
    }
  }, [location, props]);

  return <div></div>;
};

export default AuthVerify;