// this is: src/components/logout-button.js
// from: https://auth0.com/blog/complete-guide-to-react-user-authentication/#Add-User-Authentication
// see also: https://auth0.com/docs/quickstart/spa/react/01-login#add-logout-to-your-application

import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  return (
    <button
      className="btn btn-danger btn-block"
      onClick={() =>
        logout({
          returnTo: window.location.origin,
        })
      }
    >
      Log Out
    </button>
  );
};

export default LogoutButton;
