const axios = require('axios');

exports.handler = async event => {
    let response = [ ];
    await axios.request({
            url: '/Client/137',
            method: 'get',
            baseURL: 'http://172.16.15.2/Sage/api',
            auth: {
                username: '0oa5b2e6tzPVXNp6F5d6',
                password: 'bX16EoSUaBYk9ygYjuiRmH393UblbqppbT7ONQ7Q'
            },
            data: {
                'grant-type': 'client_credentials',
                'scope': 'public'
            }
        })
        .then((res) => {
            console.log(res);
            return {
                headers: {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Methods': '*',
                    'Access-Control-Allow-Origin': '*',
                },
                statusCode: 200,
                body: JSON.stringify(res)
            }
        })
        .catch((error) => {
            console.error(error)
        });
}