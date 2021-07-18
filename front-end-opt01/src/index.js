// Works. Does not even require checks in /login

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
// following one line from: https://auth0.com/docs/quickstart/spa/react/01-login#configure-the-auth0provider-component
// import { Auth0Provider } from "@auth0/auth0-react";
import Auth0ProviderWithHistory from "./auth/auth0-provider-with-history";
import reportWebVitals from './reportWebVitals';

import './index.css';

// v1 from: https://auth0.com/docs/quickstart/spa/react/01-login#configure-the-auth0provider-component
// v2 from: https://auth0.com/blog/complete-guide-to-react-user-authentication/#Calling-an-API
ReactDOM.render(
    <Router>
	<Auth0ProviderWithHistory>
	<App />
	</Auth0ProviderWithHistory>
	</Router>,
    document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
