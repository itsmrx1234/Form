import express from 'express'
import { connectDB } from './config/db.js'
import userRoute from './routes/user.route.js'
const app  = express()
connectDB()
app.use(express.json())
app.use('/user',userRoute)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
