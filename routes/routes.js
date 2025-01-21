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
                    "href": process.env.BASE_URL + "/sets/"
                },
                "collection": {
                    "href": process.env.BASE_URL + "/sets"
                }
            }
        }
        res.status(200).json(collection)
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.post('/', async (req, res) => {
    if (req.body.method === "SEED") {
        try {
            await Set.deleteMany({})

            const amount = req.body.amount

            for (let i = 0; i < amount; i++) {
                await Set.create({
                    name: faker.lorem.lines(1),
                    brand: faker.lorem.lines(1),
                    setNumber: faker.lorem.lines(1),
                    releaseYear: faker.date.future()
                });
            }

            res.status(200).json({success: true})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    } else {
        try {
            const name = req.body.name
            const brand = req.body.brand
            const setNumber = req.body.setNumber
            const releaseYear = req.body.releaseYear

            await Set.create({
                name: name,
                brand: brand,
                setNumber: setNumber,
                releaseYear: releaseYear
            })

            res.status(200).json({success: true})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
})

export default router