import cors from 'cors';
import express from 'express';
import recipeRoute from './routes/recipe.route.js';
import userRouter from './routes/user.route.js';

const app = express();

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'https://recipe-booking-app-mashruf-ahmed55.netlify.app',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/recipes', recipeRoute);
app.use('/api/users', userRouter);

export default app;
