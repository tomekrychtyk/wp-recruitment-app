import Unsplash from 'unsplash-js';

import { ACCESS_KEY, SECRET_KEY } from '../../config';

const unsplash = new Unsplash({
  applicationId: ACCESS_KEY,
  secret: SECRET_KEY,
  // callbackUrl: "{CALLBACK_URL}"
});

export default unsplash;