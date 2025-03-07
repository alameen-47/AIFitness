import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';
dotenv.config();

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MONGODB CONNECTED ${conn.connection.host}`.bgWhite.green);
  } catch (error) {
    console.error(`Error in MongoDB${error}`.bgRed.white);
    process.exit(1);
  }
};
