import Set from "../models/LegoSet";
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

export default router