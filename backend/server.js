const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const userRoute = require('../backend/routes/user.route.js')

const app = express();
dotenv.config()

app.use(express.json())




const connectDB = async() => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${connect.connection.host}`)
    } catch (error) {
        console.log(error);
    }
}
connectDB();

app.use('/user', userRoute)


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));