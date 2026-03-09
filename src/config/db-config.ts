import mongoose from 'mongoose';

const connectDb = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI as string, {
      dbName: 'auth',
    });
    console.log(`MongoDB Connected: ${connection.connection.name}`);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDb;
