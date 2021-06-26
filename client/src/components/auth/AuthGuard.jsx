import React from "react";
import { useHistory } from "react-router";

const AuthGuard = (props) => {
  const history = useHistory();
  const isLoggedIn = Boolean(localStorage.getItem("token"));
  React.useEffect(() => {
    if (!isLoggedIn) history.push("/login");
  }, []);
  if (!isLoggedIn) return <></>;
  return <>{props.children}</>;
};

export default AuthGuard;
