import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {

 

  port: process.env.PORT,
  mongo_uri: process.env.MONGO_URI,
  mongo_uri_local: process.env.MONGO_URI_LOCAL,

  salt_round: process.env.BCRYPT_SALT_ROUND,
  jwt_access_secret: process.env.JWT_SECRET,
  jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
  jwt_at_ex_in: process.env.JWT_SECRET_EXPIRES_IN,
  jwt_rt_ex_in: process.env.JWT_REFRESH_TOKEN_EXPIRES_IN,
  
  node_env: process.env.NODE_ENV,

  mailtrap_endpoint: process.env.MAILTRAP_ENDPOINT,
  mailtrap_token: process.env.MAILTRAP_TOKEN,

  cloudinary_name: process.env.CLOUDINARY_CLOUD_NAME,
  cloudinary_key: process.env.CLOUDINARY_API_KEY,
  cloudinary_secret: process.env.CLOUDINARY_API_SECRET,

  
};
