
# Local Test Certificates: What and How (Executive Summary)

To create the needed self-signed test certs (that last for 10 years), simply execute the script
> `sh make_certs.sh`.

(If on Windows, be sure to execute in a git-bash shell, which has a fairly recent openssl version)

Important!!! Before using these certs, ensure the names ui.localtest.me and api.localtest.me both still resolve to 127.0.0.1.

You can verify the contents of these cert via:
> `openssl x509 -in ui_server_cert.pem -noout -text | less`

and

> `openssl x509 -in api_server_cert.pem -noout -text | less`

(Yes, the critical Basic Constraint has `CA:TRUE`, which is inappropriate for an end-entity cert, but the cert is for testing and works for our needs.)

The contents of make_certs.sh was inspired by https://flaviocopes.com/express-https-self-signed-certificate/

# Local Test Certificates: Why (TL;DR)

There are some domain name owners that have kindly set up "wildcarded DNS domains" that will always resolved to 127.0.0.1.
Some of those are listed here: http://www.fidian.com/programming/public-dns-pointing-to-localhost .
We will use "localtest.me" because the name reflects our intent: local tests.
