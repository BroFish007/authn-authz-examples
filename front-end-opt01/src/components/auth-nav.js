// this is: src/components/auth-nav.js
// from: https://auth0.com/blog/complete-guide-to-react-user-authentication/#Add-User-Authentication

import React from "react";
import AuthenticationButton from "./authentication-button";

const AuthNav = () => (
  <div className="navbar-nav ml-auto">
    <AuthenticationButton />
  </div>
);

export default AuthNav;
