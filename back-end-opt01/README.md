# Back End Option #1

## Synopsis
- Node.js using the Koa framework
- Assumes the UI did a federated login using Auth0 developer account

## Installation
(1) `npm install`

(2) Go into `../certs` and run `sh make_certs.sh` (no input should be needed).
Then copy `api_server_*.pem` into this folder.

(3) Create the `.env` file, using `.env_example` as a guide.
(But if you're on the same project, ask BroFish for the `.env` file.)

## Launching The Proof-of-Concept
`nodemon app.js`
