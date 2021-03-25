const axios = require('axios');
const oauth = require('axios-oauth-client');

exports.handler = async event => {
  const getClientCredentials = oauth.client(axios.create(), {
    url: 'https://dev-14374873.okta.com/oauth2/default/v1/token',
    grant_type: 'client_credentials',
    client_id: '0oa5b2e6tzPVXNp6F5d6',
    client_secret: 'bX16EoSUaBYk9ygYjuiRmH393UblbqppbT7ONQ7Q',
    scope: 'manage:lists'
  });

  const okta = await getClientCredentials();

  console.log(okta);

  axios.defaults.headers.common = {'Authorization' : `Bearer ${okta.access_token}`};

  await axios.get('http://172.16.15.2/Sage/api/Client/141/')
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.error(error);
    })


  return {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Methods': '*',
      'Access-Control-Allow-Origin': '*',
      'Accept': '*/*'
    },
    statusCode: 200,
    body: "COMPLETED"
  }
};
