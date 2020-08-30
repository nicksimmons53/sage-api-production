const AWS = require('aws-sdk');

const s3Client = new AWS.S3( );

const S3 = {
    async getAllFiles(folder, bucket) {
        const params = {
            Bucket: bucket,
            Prefix: folder
        };

        let data = await s3Client.listObjectsV2(params).promise( );

        if (!data) throw Error("Error retrieving file from S3.");

        return data;
    },
    async write(data, fileName, bucket) {
        const params = {
            Bucket: bucket,
            Body: data,
            Key: fileName
        };

        const newData = await s3Client.putObject(params).promise( );

        if (!newData) throw Error("Error writing the file to S3.");

        return newData;
    }
};

module.exports = S3;