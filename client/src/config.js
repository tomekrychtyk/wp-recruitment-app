// Options for the 'Sort by' dropdown
export const photoSortOptions = [
  { id: 'latest', title: 'Latest' },
  { id: 'oldest', title: 'Oldest' },
  { id: 'popular', title: 'Popular' },
];

// Amount of photos fetched by a single API call on infinite scroll
export const photosPerPage = 10;

// Default photos order
export const defaultPhotosOrder = 'latest';

/* Unsplash-js config */
export const ACCESS_KEY = 'ddcb27b870abfd227268a538cccd7bf4ba5fbfdbb03da4d055ecf6b3d0b5bb6a';
export const SECRET_KEY = 'd47f0132b1385585ee158bbe4947cf279aa550a5455718c9d9ee8dcc61a8f3ff';

/* AWS S3 config */
export const s3 = {
  REGION: 'eu-central-1',
  BUCKET: 'wp-unsplashed',
};

/* API config */
export const apiGateway = {
  REGION: 'eu-central-1',
  URL: 'https://2jd1nk10u1.execute-api.eu-central-1.amazonaws.com/prod',
};

/* AWS Cognito config */
export const cognito = {
  REGION: 'eu-central-1',
  USER_POOL_ID: 'eu-central-1_bzFv7NPLM',
  APP_CLIENT_ID: '23h0inkct0uqs4ebodgcb8ts99',
  IDENTITY_POOL_ID: 'eu-central-1:dc7ab507-00f6-45d5-9e5e-5584d2c0812a',
};
