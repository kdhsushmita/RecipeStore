const express = require('express');
const { getallRecipes, getsingleRecipe, createRecipe, deleteRecipe, updateRecipe } = require('../controllers/recipe');
const router = express.Router();

router.get("/", getallRecipes);
router.get("/:id", getsingleRecipe);
router.post("/", createRecipe);
router.delete("/:id", deleteRecipe);
router.patch("/:id", updateRecipe);

module.exports = router