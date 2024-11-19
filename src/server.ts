import config from './app/config';
import mongoose from 'mongoose';
import app from './app';

async function main() {
  try {
    await mongoose
      .connect(
         config.mongo_uri_local as string,
      )
      .then(() => {
        console.log('connected');
      })
      .catch(() => {
        console.log('try again');
      });

    // await mongoose.connect('mongodb://localhost:27017/ecommerce-v2');
    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log(error);
  }
}

main();
