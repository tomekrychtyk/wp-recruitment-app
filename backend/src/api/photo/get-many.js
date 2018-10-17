import * as DynamoDbLib from '../../libs/dynamodb';
import { success, failure } from '../../libs/response';

export async function main(event, context, callback) {
  const params = {
    TableName: 'unsplashed',

    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ":userId": event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    const result = await DynamoDbLib.call('query', params);
    // Return the list of photos
    callback(null, success(result.Items));
  } catch(e) {
    // Return "500" if something went wrong
    callback(null, failure({ status: false }));
  }
}