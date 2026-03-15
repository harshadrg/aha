import mongoose from "mongoose";

let isConnected = false;

const connectDB = async () => {
  if (isConnected) {
    return; // Already connected, don't do anything
  }

  try {
    const db = await mongoose.connect(process.env.MONGO_URI);
    isConnected = db.connections[0].readyState;
    console.log(`✅ MongoDB Connected: ${db.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Failed: ${error.message}`);
    // Don't use process.exit(1) on Vercel!
  }
};

export default connectDB;