import mongoose from "mongoose";

const URI ="mongodb+srv://jonatantejeda:jonatantejeda01@cluster0.t6xuq1d.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

const connectToDB = async () => {
    try {
        await mongoose.connect(URI);
        console.log('Connected to DB ecommerce');
    } catch (error) {
        console.error('Error connecting to database:', error);
    }
};

export default connectToDB;
