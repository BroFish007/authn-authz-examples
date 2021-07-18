// this is: src/components/login-button.js
// from: https://auth0.com/blog/complete-guide-to-react-user-authentication/#Calling-an-API
// see also: https://auth0.com/docs/quickstart/spa/react/01-login#add-login-to-your-application

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <button
      className="btn btn-primary btn-block"
      onClick={() => loginWithRedirect()}
    >
      Log In
    </button>
  );
};

export default LoginButton;
