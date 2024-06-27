import mongoose from 'mongoose';
const mongooseURL = "mongodb+srv://kaju456:l4EJtrw8yeZXRWMl@cluster0.gtee4rz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";   //qrMenu is the database name 

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
