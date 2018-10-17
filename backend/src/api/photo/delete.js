import * as dynamoDbLib from '../../libs/dynamodb';
import { success, failure } from '../../libs/response';

export async function main(event, context, callback) {
  const params = {
    TableName: "unsplashed",

    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      photoId: event.pathParameters.id
    }
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    callback(null, success({ status: true }));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}