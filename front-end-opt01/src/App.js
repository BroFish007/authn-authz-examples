// import logo from './logo.svg';
import './App.css';
import './list_styles.css';
// inspired by: https://reactrouter.com/web/guides/quick-start
import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";


// inspired by: https://auth0.com/docs/quickstart/spa/react/01-login#add-login-to-your-application
import { useAuth0 } from "@auth0/auth0-react";

import LoginButton  from "./components/login-button";
import LogoutButton from "./components/logout-button";
import AuthNav from "./components/auth-nav";

// import { Profile } from "./views";			// nope: Module not found: Can't resolve './views' in '...\src'
// import Profile from "./views";			// nope: Module not found: Can't resolve './views' in '...\src'
// import { Profile } from "./views/profile.js";	// nope: Attempted import error: 'Profile' is not exported from './views/profile.js'.
// import Profile from "./views/profile.js";	// works
import Profile from "./views/profile";	// works

function App() {
    // inspired by: https://reactrouter.com/web/guides/quick-start
    return (
    <Router>
      <div>
        <nav>
          <ul>
            <li> <Link to="/">Home</Link> </li>
            <li> <Link to="/open">Open</Link> </li>
	    <li> <Link to="/login">Simple<br/>Login</Link> </li>
	    <li> <Link to="/login2">Better<br/>Login</Link> </li>
	    <li> <Link to="/profile">Profile</Link> </li>
            <li> <Link to="/protected">Protected</Link> </li>
	    <li> <Link to="/logout">Logout</Link> </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
            <Route path="/open"><Open /></Route>
	    <Route path="/login"><Login /></Route>
	    <Route path="/login2" component={AuthNav} />
	    <Route path="/logout"><Logout /></Route>
	    <Route path="/profile" component={Profile} />
            <Route path="/protected"><Protected /></Route>
	    {/* "/" must be last */}
            <Route path="/"><Home /></Route>
        </Switch>
      </div>
    </Router>
  );
};

function dait() {
    let dait = new Date();
    return dait.toISOString();
}

function Home() {
    console.log("in home");
    return <h2>Home</h2>;
}

function Login () {
    console.log("in login");
    return (
	<div>
	    <h2>Login</h2>
	    <p>Clicking on the following button will take you to Auth0 to login.<br />
	    However, if clicking the button takes you immediately to the "Home" screen, it means you''re already logged in!</p>
	    <LoginButton />
	</div>
    );
}
// N.B., in Auth0 you must also populate: Applications > Applications > [yourApplication] > Allow Logout URLs

function Logout () {
    console.log("in logout");
    return (
	    <div>
	    <h2>Logout</h2>
	    <p>Clicking on the following button will log you out of Auth0.</p>
	    <LogoutButton />
	    </div>
    );
}
// N.B., in Auth0 you must also populate: Applications > Applications > [yourApplication] > Allow Logout URLs
// see also: https://auth0.com/docs/api/authentication?javascript#enterprise-saml-and-others-

function Open () {
    console.log("in open");

    return (
	    <div>
	    <h2>Open</h2>
	    <p>This page is not protected. Its contents are accessible by anyone.</p>
	    </div>
    );
}
// <p>Call the API (on a separate node instance) on <a href="https://localhost:3001/debug" target="_blank" rel="noreferrer">localhost:3001/debug</a></p>

// related:
//	https://reactjs.org/docs/faq-ajax.html
//	https://www.smashingmagazine.com/2020/06/rest-api-react-fetch-axios/
//	https://stackoverflow.com/questions/10636611/how-does-access-control-allow-origin-header-work

// inspired by: https://rapidapi.com/blog/how-to-use-an-api-with-react/
function  CallApi() {
    console.log("in CallApi");

    const apiUrl = "https://localhost:3001/api"

    let state = {
	error: null,
	isLoaded: false,
	items: []
    };

    let xx = null;
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    fetch(apiUrl, {
	mode: 'no-cors',
	"headers": {
	    // "Access-Control-Allow-Origin": "https://localhost:3001"
	    'X-time': 'of-the-end'
	}
    })
	.then( res => res.json() )
	.then(
	    (result) => {
		xx = result.items;
		state.isLoaded= true;
		state.items = result.items;
		console.log('result.items=' + JSON.stringify(result.items, null, 2));
	    },
	    // Note: it's important to handle errors here
	    // instead of a catch() block so that we don't swallow
	    // exceptions from actual bugs in components.
	    (error) => {
		state.isLoaded = true;
		state.error = true
	    });
    console.log('xx=' + JSON.stringify(xx, null, 2) );
    return state;

}

// inspired by: https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

function CallApi3() {
    console.log("in CallApi3");
    //const apiUrl = "https://localhost:3001/api"
    const apiUrl = "https://api.localtest.me:3001/api";
    const options = {
	// method choices: GET(*), POST, PUT, DELETE, etc.
	method: 'GET',
	// mode choices: no-cors, cors(*), same-origin
	// note that "no-cors" allows only a limited set of headers in the requests: Accept; Accept-Language; Content-Language; Content-Type with a value of application/x-www-form-urlencoded, multipart/form-data, or text/plain
	mode: 'cors',
	// cache choices: default(*), no-cache, reload, force-cache, only-if-cached
	// credentials choices: include, same-origin(*), omit
	credentials: 'include',
	headers: {
	    'User-Agent': 'Amiga Toaster3',
	    'X-myCustomHeader': 1914,
	    'Authorization' : 'Bearer: 776688'
	}
	// redirect choices: manual, follow(*), error
	// referrerPolicy choices: no-referrer, no-referrer-when-downgrade(*), origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    }


    // https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
    // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch
    // https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/fetch
    // https://developer.mozilla.org/en-US/docs/Glossary/Forbidden_header_name
    // https://fetch.spec.whatwg.org/#cors-safelisted-request-header
    // https://reactjs.org/docs/faq-ajax.html

    fetch(apiUrl, options)
	.then(response => response.json())
	.then(data => console.log('Data: ', data))
	.catch((error) => console.error('Error; ', error));

//	.then(result => {
//	    console.log('Success:', result);
//	})
//	.catch(error => {
//	    console.error('Error:', error);
//	});

}

const CallApi4 = async() => {
    // inspired by: https://auth0.com/blog/complete-guide-to-react-user-authentication/#Calling-an-API
    // (part of the example for src/views/external-api.js)
    const apiUrl = "https://api.localtest.me:3001/api";
    const { getAccessTokenSilently } = useAuth0();
    try {
	const token = await getAccessTokenSilently();
	const response = await fetch(
	    apiUrl,
	    {
		method: 'GET',
		mode: 'cors',
		credentials: 'include',
		headers: {
		    'User-Agent': 'Amiga Toaster4',
		    Authorization : `Bearer: ${token}`,
		}
	    }
	);

	const responseData = await response.json();
	console.log('responseData=' + responseData);
    } catch (error) {
	console.log('error=' + error);
    }
};

function Protected() {
    console.log('in Protected');
    let state = CallApi4();
    console.log('state=|' + state + '|');
    console.log('state=' + JSON.stringify(state, null, 2));

    const { user, isAuthenticated, isLoading } = useAuth0();
    const { getAccessTokenSilently } = useAuth0();
    
    console.log('user=' + user);
    let user_pretty = '';
    if (user) {
	user_pretty = JSON.stringify(user, null, 2);
	console.log('user=' + user_pretty);
    };

    let gats_pretty = '';
    if (getAccessTokenSilently) {
	gats_pretty = JSON.stringify(getAccessTokenSilently, null, 2);
    }

    const token = /* await */ getAccessTokenSilently();
    let token_pretty = '';
    if (token) {
	console.log('token=' + token);
	token_pretty = JSON.stringify(token, null, 2);
    }

    console.log('isAuthenticated=' + isAuthenticated);

    // inspired by:
    //	https://auth0.com/docs/quickstart/spa/react/01-login#show-user-profile-information
    //	https://auth0.com/blog/complete-guide-to-react-user-authentication/#Calling-an-API

    if (isLoading) {
	return (
		<div>
		<h2>Protected</h2>
		<p>{ dait() }</p>
		<p>Loading...</p>
		</div>
	);
    }

    //console.log('state.isLoaded=' + state.isLoaded);
    return (
	<div>
	    <h2>Protected</h2>
	    <p>{ dait() }</p>
	    {/* state */}
	<h3>User</h3>
	    <pre>
	    {user_pretty}
	</pre>
	    <h3>getAccessTokenSilently</h3>
	    <pre>
	    {gats_pretty}
	</pre>
	    <h3>Token</h3>
	    <pre>
	    {token_pretty}
	</pre>
	</div>
    );

    //	    <p>Name: {user.name}</p>
    //	    <p>Email: {user.email}</p>

}

export default App;
