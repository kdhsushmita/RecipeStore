const mongoose = require('mongoose')

const RecipeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please provide recipe name'],
            maxlength: 20,
        },
        description: {
            type: String,
            required: [true, 'Please provide description name'],
            maxlength: 100,
        },
        ingredients: {
            type: String,
            required: [true, 'Please provide ingredients name'],
            maxlength: 100,
        },
        createdBy: {
            type: mongoose.Types.ObjectId,
            ref: 'User',
            required: [true, 'Please provide user'],
        },
    },
    { timestamps: true }
)

module.exports = mongoose.model('Recipe', RecipeSchema)