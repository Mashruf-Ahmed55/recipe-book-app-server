import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    title: {
      type: String,
    },
    ingredients: {
      type: [String],
    },
    instructions: {
      type: [String],
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
    },
    preparationTime: {
      type: Number,
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
    },
    likesCount: {
      type: Number,
      default: 0,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    views: {
      type: Number,
      default: 0,
    },
    viewedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
      },
    ],
    userId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Recipe', recipeSchema);
