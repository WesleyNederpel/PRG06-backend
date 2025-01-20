import express from "express";
import mongoose from "mongoose";
import sets from "./routes/routes.js";

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/legosets')
    .then(() => {
        console.log('Verbonden met MongoDB (LEGO)')
    }) .catch(error => {
    console.error('Kan geen verbinding maken met MongoDB (LEGO)', error)
})

app.use(express.json())

app.use(express.urlencoded({extended: true}))

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept, Authorization')
    next()
})

app.use((req, res, next) => {
    const acceptHeader = req.headers.accept
    if(req.method !== 'OPTIONS' && acceptHeader !== 'application/json'){
        return res.status(406).json({error: 'Requests are only accepted with Accept of json'})
    } next()
})

app.use('/sets', sets)

app.listen(process.env.EXPRESS_PORT, () => {
    console.log(`Server is listening on port ${process.env.EXPRESS_PORT}`)
});