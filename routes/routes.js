import Set from "../models/LegoSet.js";
import {faker} from "@faker-js/faker"
import express from "express"

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const sets = await Set.find({});

        const collection = {
            "items": sets,
            "_links": {
                "self": {
                    "href": process.env.BASE_URL+"/sets/"
                },
                "collection": {
                    "href": process.env.BASE_URL+"/sets"
                }
            }
        }
        res.status(200).json(collection)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/seed', async (req, res) => {
    try {
        await Set.deleteMany({})

        const amount = req.body.amount

        console.log(amount)

        for (let i = 0; i < amount; i++) {
            await Set.create({
                name: faker.lorem.lines(1),
                brand: faker.lorem.lines(1),
                setNumber: faker.helpers.uniqueArray(1),
                releaseYear: faker.date.past(3)
            });
        }

        res.status(200).json({success: true})
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

export default router