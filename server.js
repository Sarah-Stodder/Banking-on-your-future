const express = require('express');
const dotenv = require('dotenv')
const path = require('path')
const { connectDB } = require('./dbConnect.js')
const userRoute= require('./routes/UserRoute')
const transactionRoute = require('./routes/TransactionRoute')
const savingRoute = require('./routes/SavingRoute')




const app = express();
dotenv.config()
app.use(express.static('public'));
app.use(express.json());

app.use('/api/users/' , userRoute)
app.use('/api/transactions/' , transactionRoute)
app.use('/api/saving/', savingRoute)
app.get("*", function (req, res)
 {res.sendFile(path.join(__dirname, "public", "index.html"))})
connectDB()




app.listen(process.env.PORT, ()=>{
    console.log(`Server running at http://localhost:${process.env.PORT} ...`)
})

