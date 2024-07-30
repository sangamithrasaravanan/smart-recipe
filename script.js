// Simulated API data with images
const allRecipes = [
    { id: 1, title: 'Vegan Salad', description: 'A fresh vegan salad.', diet: 'vegan', image: 'images/vegan-salad.jpg' },
    { id: 2, title: 'Gluten-Free Pancakes', description: 'Delicious gluten-free pancakes.', diet: 'gluten-free', image: 'images/gluten-free-pancakes.jpg' },
    { id: 3, title: 'Vegetarian Pasta', description: 'Tasty vegetarian pasta.', diet: 'vegetarian', image: 'images/vegetarian-pasta.jpg' },
    { id: 4, title: 'Chicken Stir Fry', description: 'A simple chicken stir fry.', diet: '', image: 'images/chicken-stir-fry.jpg' },
  ];
  
  // User profile data
  let userProfile = {
    diet: ''
  };
  
  function navigate(section) {
    // Hide all sections and set them inactive
    document.querySelectorAll('.content-section').forEach(el => {
      el.style.display = 'none';
      el.classList.remove('active');
    });
  
    // Show the selected section and set it active
    const activeSection = document.getElementById(section);
    activeSection.style.display = 'block';
    setTimeout(() => activeSection.classList.add('active'), 10); // Small delay for transition effect
  
    // Specific actions for each section
    if (section === 'recipes') {
      loadSavedRecipes();
    }
  }
  
  function findRecipes() {
    const ingredients = document.getElementById('ingredients').value.toLowerCase();
    const ingredientArray = ingredients.split(',').map(i => i.trim());
    
    const filteredRecipes = allRecipes.filter(recipe => {
      return ingredientArray.every(ingredient => 
        recipe.description.toLowerCase().includes(ingredient)
      ) && (userProfile.diet === '' || recipe.diet === userProfile.diet);
    });
  
    displayRecipes(filteredRecipes, 'recipe-list');
  }
  
  function displayRecipes(recipes, elementId) {
    const recipeList = document.getElementById(elementId);
    recipeList.innerHTML = '';
    if (recipes.length > 0) {
      recipes.forEach(recipe => {
        const recipeCard = document.createElement('div');
        recipeCard.className = 'recipe-card';
        recipeCard.innerHTML = `
          <img src="${recipe.image}" alt="${recipe.title}">
          <h3>${recipe.title}</h3>
          <p>${recipe.description}</p>
          <button onclick="saveRecipe(${recipe.id})">Save</button>
        `;
        recipeList.appendChild(recipeCard);
      });
    } else {
      recipeList.innerHTML = '<p>No recipes found. Try different ingredients or adjust your dietary preferences.</p>';
    }
  }
  
  function saveRecipe(recipeId) {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    if (!savedRecipes.includes(recipeId)) {
      savedRecipes.push(recipeId);
      localStorage.setItem('savedRecipes', JSON.stringify(savedRecipes));
      alert('Recipe saved!');
    } else {
      alert('Recipe is already saved.');
    }
  }
  
  function loadSavedRecipes() {
    const savedRecipes = JSON.parse(localStorage.getItem('savedRecipes')) || [];
    const recipesToDisplay = allRecipes.filter(recipe => savedRecipes.includes(recipe.id));
    displayRecipes(recipesToDisplay, 'saved-recipe-list');
  }
  
  function saveProfile() {
    const diet = document.getElementById('diet').value;
    userProfile.diet = diet;
    alert('Profile saved!');
  }
  
  // Initialize with home view
  navigate('home');
  