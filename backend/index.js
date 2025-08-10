import express from 'express'
import { connectDB } from './config/db.js'
import userRoute from './routes/user.route.js'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app  = express()
app.use(cookieParser())
app.use(cors({
  origin: "http://localhost:5173", 
  credentials: true
}));
connectDB()
app.use(express.json())
app.use('/user',userRoute)
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
