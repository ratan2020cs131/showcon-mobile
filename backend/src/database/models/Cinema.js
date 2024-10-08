import mongoose from 'mongoose'

const seatMapSchema = new mongoose.Schema({
    row: {
        type: String,
        required: true
    },
    seats: {
        type: [Number],
        required: true,
        validate: {
            validator: (value) => {
                return value.length > 0;
            },
            message: 'At least one seat per row is required.'
        }
    }
}, { _id: false });


const bookingSchema = new mongoose.Schema({
    movie: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'movies',
        required: true,
        validate: {
            validator: (value) => {
                return value.length > 0;
            },
            message: 'Provide a valid movie Id'
        }
    },
    price: {
        type: Number,
        required: true
    },
    lang: {
        type: [String],
        required: false
    },
    dates: {
        type: [String],
        required: true,
        validate: {
            validator: (value) => {
                return value.length > 0;
            },
            message: 'At least one date is required'
        }
    }
}, { _id: false })


const slotSchema = new mongoose.Schema({
    time: {
        type: String
    },
    booking: {
        type: bookingSchema,
        required: false
    }
})

const screenSchema = new mongoose.Schema({
    screen: {
        type: String,
        required: true
    },
    seatmap: {
        type: [seatMapSchema],
        required: true
    },
    slots: {
        type: [slotSchema],
        required: true,
        validate: {
            validator: (value) => {
                return value.length > 0;
            },
            message: 'At least one slot per screen is required.'
        }
    }
});

const cinemaSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    isApproved: {
        type: Boolean,
        default: false
    },
    title: {
        type: String,
        required: true
    },
    address: {
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: false
        },
        country: {
            type: String,
            required: false
        },
        zipcode: {
            type: String,
            required: true
        }
    },
    type: {
        type: [String],
        default: []
    },
    screen: {
        type: [screenSchema],
        validate: {
            validator: (value) => {
                return value.length > 0;
            },
            message: 'At least one screen is required.'
        }
    }
});

const Cinema = mongoose.model('Cinema', cinemaSchema);

export default Cinema;








// const mongo = require('mongoose');

// const cinema = new mongo.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     address: {
//         city: {
//             type: String,
//             required: true
//         },
//         state: {
//             type: String,
//             required: false
//         },
//         country: {
//             type: String,
//             required: false
//         },
//         zipcode: {
//             type: String,
//             required: true
//         }
//     },
//     type: [{
//         type: String,
//         required: false
//     }],
//     screen: [{
//         screen: {
//             type: String,
//             required: true
//         },
//         seatmap:[{
//             row:{
//                 type: String,
//                 required: true
//             },
//             seats:[{
//                 type: Number,
//                 required: true
//             }],
//             slots:
//         }]
//     }]
// }, { _id: false });

// const Cinema = mongo.model('cinemas', cinema);

// module.exports = Cinema;