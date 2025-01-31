import Set from "../models/LegoSet.js";
import {faker} from "@faker-js/faker"
import express from "express"

const router = express.Router()

router.get('/', async (req, res) => {
    try {
        const sets = await Set.find({}, 'name brand');

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

            res.status(201).json({success: true})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    } else {
        const { name, brand, setNumber, releaseYear } = req.body;

        if (!name || !brand || !setNumber || !releaseYear) {
            return res.status(400).json({ error: 'Name, brand, setNumber, and releaseYear are required.' });
        }
        try {

            const newSet = await Set.create({
                name: name,
                brand: brand,
                setNumber: setNumber,
                releaseYear: releaseYear
            })

            res.status(201).json(newSet)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
})

router.options('/', async (req, res) => {
    res.setHeader('Allow', 'GET, POST, OPTIONS')
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
    res.status(204).send()
})

router.get('/:id', async (req, res) => {
    try {
        const setId = req.params.id
        const set = await Set.findById(setId)

        if (!set) {
            return res.status(404).json({message: "Set not found"})
        }

        res.status(200).json(set)

    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.put('/:id', async (req, res) => {
    try {
        const setId = req.params.id;
        const updatedData = req.body;

        const requiredFields = ['name', 'brand', 'setNumber', 'releaseYear'];
        for (const field of requiredFields) {
            if (!updatedData[field] || updatedData[field].trim() === '') {
                return res.status(400).json({ error: `${field} is required and cannot be empty.` });
            }
        }

        const updatedSet = await Set.findByIdAndUpdate(setId, updatedData, { new: true, runValidators: true });

        if (!updatedSet) {
            return res.status(404).json({ error: 'Set not found.' });
        }

        res.status(200).json({ success: true, data: updatedSet });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const setId = req.params.id;
        const updatedData = req.body;

        const updatedSet = await Set.findByIdAndUpdate(setId, updatedData, { new: true, runValidators: true });

        if (!updatedSet) {
            return res.status(404).json({ error: 'Set not found.' });
        }

        // Respond with the updated document
        res.status(200).json({ success: true, data: updatedSet });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const setId = req.params.id

        await Set.findByIdAndDelete(setId)

        res.status(204).send()
    } catch (error) {
        res.status(500).json({error: error.message})
    }
})

router.options('/:id', (req, res) => {
    res.setHeader('Allow', 'GET, PUT, PATCH, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, DELETE, OPTIONS')
    res.status(204).send()
})

export default router