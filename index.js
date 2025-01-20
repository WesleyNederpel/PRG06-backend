import express from "express"
import mongoose from "mongoose"

const app = express()

mongoose.connect('mongodb://127.0.0.1:27017/legosets')
    .then(() => {
        console.log('Verbonden met MongoDB (LEGO)')
    }) .catch(error => {
    console.error('Kan geen verbinding maken met MongoDB (LEGO)', error)
})

app.use(express.json())

app.use(express.urlencoded({extended: true}))

