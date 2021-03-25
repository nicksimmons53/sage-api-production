require('dotenv').config( );

const S3 = require('../common/S3');
const bucket = process.env.bucketName;

exports.handler = async event => {
    let folder = event.pathParameters.fileName;

    const file = await S3.getAllFiles(folder, bucket).catch(error => {
        console.log(error);
        return null;
    });

    if (!file) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 400,
            body: JSON.stringify({ message: "Failed to retrieve file." }),
        };
    }

    return {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify({ file })
    }
}