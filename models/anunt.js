const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const Review = require('./review')
const User = require('./user')


const opts = {toJSON: {virtuals: true}};

const anunturiSchema = new mongoose.Schema({
    sport: {
        type: String,
        required: true,
        lowercase: true,
        enum: ['fotbal', 'tenis', 'baschet']
    },
    dificultate: {
        type: String,
        required: true,
        enum: ['Amateur', 'Semi-amateur', 'Medium', 'Advanced']
    },
    organizator: {
        type: String,
        required: true
    },
    telefon: {
        type: Number,
        required: true,
        min: 10,

    },
    oras: {
        type: String,
        required: true
    },
    dataSiOra: {
        required: true,
        type: Date
    },
    team: {
        type: Schema.Types.ObjectId,
        refPath: 'onModel'
    },
    onModel: {
        type: String,
        required: true,
        enum: ['EchipaBaschet', 'EchipaFotbal', "EchipaTenis"]
    },
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    geometry: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
}, opts)

anunturiSchema.virtual('properties.popUpMarkup').get(function () {
    console.log(this)
    return `<strong><a href=\\"/anunt/${this.sport}/${this._id}\\">${this.sport} - ${this.organizator}</a><strong>`

});

anunturiSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

const Anunt = mongoose.model('Anunt', anunturiSchema)
module.exports = Anunt























