require('dotenv').config()
const express = require("express")
const colors =require("colors")
const morgan = require('morgan');
const mysqlPool = require('./config/dbconnect');


const app = express()
app.use(morgan("dev"))
app.use(express.json());
app.use("/api/v1/student", require("./routes/studentRoutes.js"))
app.get('/test',(req,res) => {
    res.status(200).send('<h1>sql App</h1>')
})

mysqlPool.query('SELECT 1').then(() => {
    console.log('Mysql Database connected'.bgRed.white)
    app.listen(process.env.PORT , () => {
        console.log("server Running".bgBlue.white)
    })
    
}).catch((error) =>{
    console.log(error)
})
