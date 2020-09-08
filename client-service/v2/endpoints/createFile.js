const S3 = require('../common/S3');
const bucket = process.env.bucketName;

exports.handler = async event => {
    let { clientName, base64String } = JSON.parse(event.body);
    let fileName = clientName + "/" + event.pathParameters.fileName;

    let buffer = Buffer.from(base64String, 'base64');

    const newData = await S3.write(buffer, fileName, bucket).catch(error => {
        console.log(error);
        return null;
    });

    if (!newData) {
        return {
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Methods': '*',
                'Access-Control-Allow-Origin': '*',
            },
            statusCode: 400,
            body: JSON.stringify({ message: "Failed to write" }),
        };
    }

    return {
        headers: {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Origin': '*',
        },
        statusCode: 200,
        body: JSON.stringify({ newData })
    }
}