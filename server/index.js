const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const authRouter = require('./routes/auth')
const postRouter = require('./routes/post')
require('dotenv').config()

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://phongph:1234@mern-learn2.kp0qe.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log('DB connected')
    } catch (error) {
        console.log(error.message)
        process.exit(1)
    }
}

connectDB()

const app = express();

app.use(express.json())
app.use(cors())
app.use('/api/auth', authRouter)
app.use('/api/posts', postRouter)
const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log('server started on port 5000'))