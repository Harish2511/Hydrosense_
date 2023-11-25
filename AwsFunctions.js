import AWS from 'aws-sdk';

AWS.config.update({
  region: 'ap-southeast-2',
  accessKeyId: 'AKIAYDS3S2FHQKWKXRD5',
  secretAccessKey: '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',
  dynamoDbCrc32: false
});

const docClient = new AWS.DynamoDB.DocumentClient();

export const fetchData = async (tableName) => {
  const params = {
    TableName: tableName,
  };

  try {
    const data = await docClient.scan(params).promise();
    return data.Items || [];
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};
