import recipeModel from '../models/recipe.model.js';
import userModel from '../models/user.model.js';

// create recipe
export const createRecipe = async (request, response) => {
  try {
    const {
      image,
      title,
      ingredients,
      instructions,
      cuisineType,
      preparationTime,
      categories,
      userId,
    } = request.body;

    if (
      !image ||
      !title ||
      !ingredients ||
      !instructions ||
      !cuisineType ||
      !preparationTime ||
      !categories ||
      !userId
    ) {
      return response.status(400).json({ message: 'All fields are required' });
    }

    const existingRecipe = await recipeModel.findOne({ title });
    if (existingRecipe) {
      return response.status(400).json({ message: 'Recipe already exists' });
    }

    const newRecipe = await recipeModel.create({
      image,
      title,
      ingredients,
      instructions,
      cuisineType,
      preparationTime,
      categories,
      userId,
    });

    response
      .status(201)
      .json({ message: 'Recipe created successfully', recipe: newRecipe });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
};

// get all recipes and filtered
export const getAllRecipes = async (request, response) => {
  try {
    const limit = parseInt(request.query.limit);
    const filter = {};

    if (request.query.cuisineType) {
      filter.cuisineType = request.query.cuisineType;
    }

    if (request.query.maxTime) {
      filter.preparationTime = { $lte: parseInt(req.query.maxTime) };
    }

    const recipes = await recipeModel
      .find(filter)
      .sort({ likesCount: -1 })
      .limit(limit);
    response.status(200).json(recipes);
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
};

// get recipe by id
export const getRecipeById = async (request, response) => {
  try {
    const recipeId = request.params.id;
    const recipe = await recipeModel.findById(recipeId);

    if (!recipe) {
      return response.status(404).json({ message: 'Recipe not found' });
    }

    const user = await userModel.findById(recipe.userId);
    if (!user) {
      return response.status(404).json({ message: 'User not found' });
    }

    response
      .status(200)
      .json({ recipe, user, message: 'Recipe found successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
};

// update recipe
export const recipeUpdateById = async (request, response) => {
  try {
    const recipeId = request.params.id;
    const updatedRecipe = await recipeModel.findByIdAndUpdate(
      recipeId,
      request.body,
      { new: true }
    );
    if (!updatedRecipe) {
      return response.status(404).json({ message: 'Recipe not found' });
    }
    response
      .status(200)
      .json({ recipe: updatedRecipe, message: 'Recipe updated successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
};

// delete recipe
export const recipeDeleteById = async (request, response) => {
  try {
    const recipeId = request.params.id;
    const deletedRecipe = await recipeModel.findByIdAndDelete(recipeId);
    if (!deletedRecipe) {
      return response.status(404).json({ message: 'Recipe not found' });
    }
    response
      .status(200)
      .json({ recipe: deletedRecipe, message: 'Recipe deleted successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
};

export const toggleLike = async (request, response) => {
  const { id } = request.params;
  const { userId } = request.body;

  try {
    const recipe = await recipeModel.findById(id);

    if (!recipe) {
      return response.status(404).json({ message: 'Recipe not found' });
    }

    if (recipe.userId === userId) {
      return response
        .status(400)
        .json({ message: 'You cannot like your own recipe' });
    }

    const alreadyLiked = recipe.likes.includes(userId);

    if (alreadyLiked) {
      recipe.likes = recipe.likes.filter((id) => id.toString() !== userId);
      recipe.likesCount -= 1;
    } else {
      recipe.likes.push(userId);
      recipe.likesCount += 1;
    }

    await recipe.save();

    return response.status(200).json({
      message: alreadyLiked ? 'UnLiked successfully' : 'Liked successfully',
      likesCount: recipe.likes.length,
      recipe,
    });
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: 'Internal server error' });
  }
};

export const myRecipes = async (request, response) => {
  try {
    const { id } = request.params;

    const getMyRecipes = await recipeModel.find({ userId: id });

    if (!getMyRecipes) {
      return res.status(400).json({ message: 'Your Recipes Not Found' });
    }

    response.status(200).json({
      message: 'My All Recipes',
      getMyRecipes,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
