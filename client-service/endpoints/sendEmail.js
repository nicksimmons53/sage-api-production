const AWS = require('aws-sdk');
const ejs = require('ejs');
const path = require('path');

// AWS Variables
const SES = new AWS.SES( );

exports.handler = async event => {
    let { to, from, subject, client, message } = JSON.parse(event.body);

    const params = {
        Destination: {
            ToAddresses: [ to ]
        },
        Message: {
            Body: {
                Text: { Data: message}
            },
            Subject: { Data: subject }
        },
        Source: from
    };

    try {
        await SES.sendEmail(params).promise( );
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 200,
            body: JSON.stringify({})
        };
    } catch(error) {
        console.log(error);
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 400,
            body: JSON.stringify({}),
        };
    }
}