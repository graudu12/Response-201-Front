## Tasteorama

Recipe App

This is a recipe application built with the MERN stack (MongoDB, Express.js, React.js, and Node.js). It allows users to sign up, log in, log out and perform CRUD operations on recipes. The project consists of two controllers: the user controller for authentication and the recipe controller.
Features

    User authentication (sign up, log in, and log out)
    Recipe management (create, read, update, and delete recipes)
    Saving and retrieving saved recipes
    User authentication middleware for protected routes
    API documentation using Swagger UI

Dependencies

kindly check the package.json file for all the dependencies
Installation

Install the dependencies: npm install

Configure the environment variables:

    Update the necessary values in the .env file, such as the database connection URL.

Create a .env file in the root directory and add the following variables:

The application will start running on http://localhost:${port}. Please refer to the API documentation using Swagger UI for more details on request and response formats.
Routes

   Recipes

Operations about users.


GET/api/recipes: Get all recipes.
POST/api/recipes: Create a new recipe.
GET/api/recipes/myRecipes: Get my recipes.
GET/api/recipes/favorites: Get user's favorite recipes.
PATCH/api/recipes/{recipeId}/favorites: Add a recipe to user's favorites.
DELETE/api/recipes/{recipeId}/favorites: Remove a recipe from favorites.
DELETE/api/recipes/{recipeId}: Delete my recipe.
GET/api/recipes/{recipeId}: Get recipe by id.


Auth

Auth operations.


POST/api/auth/login: Login a user.
POST/api/auth/register: Register a user.
POST/api/auth/logout: Logout a user.


User

User data.


Ingredients

Operations to manage ingredients.


GET/api/ingredients: Get all available ingredients.


Categories

Operations to manage categories.

GET/api/categories: Get all categories.

Users

GET/api/users/current: Get current user.
