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
        type: String,
        required: true
    }
}, {
    toJSON: {
        virtuals: true,
        versionKey: false,
        transform: (doc, ret) => {

            ret._links = {
                self: {
                    href: process.env.BASE_URL+`/sets/${ret.id}`
                },
                collection: {
                    href: process.env.BASE_URL+`/sets`
                }
            }

            delete ret._id
        }
    }
})

const Set = mongoose.model('Set', setSchema)

export default Set