import mongoose, {Schema} from "mongoose"

const setSchema = new Schema( {
    name: {
        type: String,
        required: true
    },

    brand: {
        type: String,
        required: true
    },

    setNumber: {
        type: String,
        required: true,
        unique: true
    },

    releaseYear: {
        type: Number,
        required: true
    }
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {

            ret._links = {
                self: {
                    href: process.env.BASE_URL+`/set/${ret.id}`
                },
                collection: {
                    href: process.env.BASE_URL+`/set`
                }
            }

            delete ret._id
        }
    }
})

const Set = mongoose.model('Set', setSchema)

export default Set