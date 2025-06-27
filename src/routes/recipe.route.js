import { Router } from 'express';
import {
  createRecipe,
  getAllRecipes,
  getRecipeById,
  getRecipeSummaryByUser,
  incrementRecipeView,
  myRecipes,
  recipeDeleteById,
  recipeUpdateById,
  toggleLike,
} from '../controllers/recipe.controller.js';

const recipeRoute = Router();

recipeRoute.route('/create-recipe').post(createRecipe);
recipeRoute.route('/get-all-recipes').get(getAllRecipes);
recipeRoute.route('/get-recipe-by-id/:id').get(getRecipeById);
recipeRoute.route('/update-recipes/:id').put(recipeUpdateById);
recipeRoute.route('/like/:id').patch(toggleLike);
recipeRoute.route('/delete-recipes/:id').delete(recipeDeleteById);
recipeRoute.route('/my-recipes/:id').get(myRecipes);
recipeRoute.route('/recipes/summary/:userId').get(getRecipeSummaryByUser);
recipeRoute.route('/recipes/:id/view').get(incrementRecipeView);

export default recipeRoute;
