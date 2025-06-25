import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    ingredients: {
      type: [String],
      required: true,
    },
    instructions: {
      type: [String],
      required: true,
    },
    cuisineType: {
      type: String,
      enum: [
        'italian',
        'mexican',
        'indian',
        'chinese',
        'thai',
        'french',
        'american',
        'spanish',
        'korean',
        'others',
      ],
      required: true,
    },
    preparationTime: {
      type: Number,
      required: true,
    },
    categories: {
      type: [String],
      enum: [
        'Breakfast',
        'Lunch',
        'Dinner',
        'Dessert',
        'Appetizer',
        'Snack',
        'Vegetarian',
        'Vegan',
        'Dairy-Free',
        'Keto',
        'Paleo',
        'Healthy',
        'Quick & Easy',
        'Budget-Friendly',
      ],
      required: true,
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: String,
      },
    ],
    userId: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Recipe', recipeSchema);
