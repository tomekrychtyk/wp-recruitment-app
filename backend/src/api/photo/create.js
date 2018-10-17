import uuid from "uuid";
import * as dynamoDbLib from '../../libs/dynamodb';
import { success, failure } from '../../libs/response';

export async function main(event, context, callback) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: "unsplashed",
    Item: {
      userId: event.requestContext.identity.cognitoIdentityId,
      photoId: uuid.v1(),
      unsplashId: data.unsplashId,
      thumbUrl: data.thumbUrl,
      regularUrl: data.regularUrl,
      createdAt: Date.now()
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    callback(null, success(params.Item));
  } catch (e) {
    callback(null, failure({ status: false }));
  }
}