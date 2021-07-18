// this is: src/auth/auth0-provider-with-history.js

// inspired by: https://auth0.com/blog/complete-guide-to-react-user-authentication/#Calling-an-API
// note that ".env" is 2 directory levels up, not in this directory

import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }) => {
    const history = useHistory();
    const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;
    const audience = process.env.REACT_APP_AUTH0_AUDIENCE;
    console.log('domain=' + domain);

    const onRedirectCallback = (appState) => {
	history.push(appState?.returnTo || window.location.pathname);
    };

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={audience}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWithHistory;

/*

The following quote is from https://auth0.com/blog/complete-guide-to-react-user-authentication/#Calling-an-API

create-react-app requires you to create custom environment variables beginning with REACT_APP_ when using a .env file.
create-react-app will ignore any other variables except NODE_ENV.

The REACT_APP_ prefix mitigates the risk of accidentally exposing a private key from your machine that may have the same name as a variable from the .env file.

*/
