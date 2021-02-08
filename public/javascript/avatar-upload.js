//Bucket Configurations
// Load the AWS SDK for Node.js


var AWS = require('aws-sdk');

var bucketName = 'max-aj-travel-log';
var bucketRegion = 'us-east-2';
var IdentityPoolId = 'us-east-2:2d5ae1d7-80ce-490d-af1a-1d31cb81cff9';

AWS.config.update({
    region: bucketRegion,
    credentials: new AWS.CognitoIdentityCredentials({
        IdentityPoolId: IdentityPoolId
    })
});

s3 = new AWS.S3({
    apiVersion: '2006-03-01',
    params: {
        Bucket: bucketName
    }
});

const expressUpload = async (e) => {

    var form = document.getElementById("fileUpload");
    var formData = new FormData(form);
    console.log("expressUpload", formData)
    const response = await fetch(`/api/users/avatar`, {
        method: 'POST',
        body: formData
    });
    window.location.reload()
}

(() => {
    document.getElementById('fileSelector').onchange = expressUpload;
})();