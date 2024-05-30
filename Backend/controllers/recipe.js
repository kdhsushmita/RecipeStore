const Recipe = require("../models/recipe");
const { StatusCodes } = require('http-status-codes');
const { BadRequestError } = require('../errors/bad-request');
const NotFoundError = require("../errors/not-found");


const createRecipe = async (req, res) => {
    req.body.createdBy = req.user.userId;
    const recipe = await Recipe.create(req.body);
    res.status(StatusCodes.CREATED).json({ recipe });
}

const getallRecipes = async (req, res) => {
    try {
        const userId = req.user.userId;
        const recipes = await Recipe.find({ createdBy: userId }).sort('createdAt');

        res.status(StatusCodes.OK).json({ recipes, count: recipes.length });
    } catch (error) {
        console.error('Error fetching recipes:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Internal Server Error' });
    }
};


const getsingleRecipe = async (req, res) => {
    const { user: { userId }, params: { id: recipeId } } = req;

    const recipe = await Recipe.findOne({
        _id: recipeId, createdBy: userId
    })

    if (!recipe) {
        throw new NotFoundError(`No recipe with this Id z${recipeId}`)
    }

    res.status(StatusCodes.OK).json({ recipe });
}

const updateRecipe = async (req, res) => {
    const { body: { name, description, ingredients }, user: { userId }, params: { id: recipeId } } = req;  //destructure

    if (name === '' || description === '' || ingredients === '') {
        throw new BadRequestError("Name or Description or Ingredient is empty")
    }

    const recipe = await Recipe.findByIdAndUpdate({ _id: recipeId, createdBy: userId }, req.body, { new: true, runValidators: true })

    if (!recipe) {
        throw new NotFoundError(`No recipe with this Id ${recipeId}`)
    }

    res.status(StatusCodes.OK).json({ recipe });

}

const deleteRecipe = async (req, res) => {
    const { user: { userId }, params: { id: recipeId } } = req;

    const recipe = await Recipe.findByIdAndDelete({ _id: recipeId, createdBy: userId })

    if (!recipe) {
        throw new NotFoundError(`No recipe with this Id ${recipeId}`)
    }

    res.status(StatusCodes.OK).send();
}

module.exports = {
    createRecipe,
    getallRecipes,
    getsingleRecipe,
    updateRecipe,
    deleteRecipe
}