cat cert_fields_ui.dat  | openssl req -nodes -new -x509 -days 3650 -keyout  ui_server_privkey.pem -out  ui_server_cert.pem 2> /dev/null
openssl x509 -in  ui_server_cert.pem -noout -text | egrep -A1 'Serial|Subject:' | grep -v 'Subject Public Key'
echo ""; echo "===================="; echo ""
cat cert_fields_api.dat | openssl req -nodes -new -x509 -days 3650 -keyout api_server_privkey.pem -out api_server_cert.pem 2> /dev/null
openssl x509 -in api_server_cert.pem -noout -text | egrep -A1 'Serial|Subject:' | grep -v 'Subject Public Key'
