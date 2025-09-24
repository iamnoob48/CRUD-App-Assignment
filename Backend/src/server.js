import express from 'express'


import authRoutes from "./routes/authRoutes.js"
import todoRoutes from "./routes/todoRoutes.js"
import auth from './middleware/auth.js'
import analyticsRoutes from './routes/analyticsRoutes.js'
import authAdmin from './middleware/authAdmin.js'
import adminRoutes from './routes/adminRoutes.js'
import userRoutes from './routes/userRoutes.js'
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json())



//For auth routes
app.use('/api/v1/auth',authRoutes);
//For todoRoutes
app.use('/api/v1/todo',auth,todoRoutes)
//For analytics route
app.use('/api/v1/analyse',auth,analyticsRoutes)

//For admin access only
app.use('/api/v1/admin',authAdmin,adminRoutes)
//For accecing the user
app.use('/api/v1/user',auth, userRoutes)





app.listen(PORT, ()=>{
    console.log("Server started on port", PORT);
})
