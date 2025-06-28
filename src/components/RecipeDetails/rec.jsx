export default function App() {
  return (
    <div className={css.container}>
      <AppHeader />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/recipes" element={<RecipePage />} />
          <Route path="/recipes/:recipeId" element={<RecipesDetailsPage />}>
            <Route path="recipeDetails" element={<RecipeDetails />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
}
