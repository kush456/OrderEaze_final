import mongoose from 'mongoose';
const mongooseURL = "mongodb+srv://amany29074:22124006@khanakhojo.xizkwpq.mongodb.net/?retryWrites=true&w=majority&appName=KhanaKhojo/qrMenu";   //qrMenu is the database name 

const mongoDB = async () => {
  try {
    await mongoose.connect(mongooseURL, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("Connected to MongoDB");
    
  
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default mongoDB
