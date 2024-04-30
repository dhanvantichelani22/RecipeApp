const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.searchBtn');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-detailsContent');
const recipeCloseButton = document.querySelector('.recipe-closeBtn');


// Function to get recipes
 const fetchRecipe = async(query)=>{
  recipeContainer.innerHTML = "<h2>Fetching Recipes..</h2>";
  try{
  // data - return promise
  const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
  // return json
   const response = await data.json();
  
   recipeContainer.innerHTML = "";
   response.meals.forEach(meal => {
    //  console.log(meal);
    //create Element -> for creating div class
     const recipeDiv = document.createElement('div'); 
     recipeDiv.classList.add('recipe');
     recipeDiv.innerHTML = `
      <img src="${meal.strMealThumb}">
      <h3>${meal.strMeal}</h3> 
      <p><span>${meal.strArea}</span> Dish</p>
      <p>Belongs to <span>${meal.strCategory}</span> Category</p>
      `
  //View button
      const recipeButton = document.createElement('button'); 
      recipeButton.textContent = "View Recipe";
      recipeDiv.appendChild(recipeButton);

   // Adding EventListener to View Recipe Button
   recipeButton.addEventListener('click',()=>{
        openRecipePopup(meal);
     });

      recipeContainer.appendChild(recipeDiv);
   });
  }
  catch(error){
    recipeContainer.innerHTML = "<h2>Error in Fetching Recipes...</h2>";
  }
  //  console.log(response.meals[2]);
}

//func to fetchIngredients and measurements
const fetchIngredients = (meal)=>{
  // console.log(meal);
  let ingredientsList = ""; // This will hold our list of ingredients in HTML format
  for(let i=1;i<=20;i++){

// Inside the loop, the code tries to fetch an ingredient from the meal object using the strIngredient${i} key (where ${i} is the current iteration of the loop). 
// If the ingredient exists, it is stored in the ingredient variable.
// If an ingredient was found (i.e., ingredient is truthy), the corresponding measure is fetched from the meal object using the strMeasure${i} key and stored 
// in the measure variable.
// The ingredientsList is then updated to include a new list item (<li>) with the measure and the ingredient. The += operator is used to append this new item
//  to the existing ingredientsList.
// If no ingredient was found (i.e., ingredient is falsy), the loop is exited using the break statement.
// Finally, after the loop has finished, the ingredientsList string is returned.
// So, if you had a meal object like this:
    
   const ingredient = meal[`strIngredient${i}`]; //here meal is current variable
    if(ingredient){
      const measure = meal[`strMeasure${i}`];
      // ingredientsList += - if not do += then prev value it will accept
      ingredientsList += `<li>${measure} ${ingredient}</li>`
    }
    else{
      break;
    }
  }
  return ingredientsList;
}

// open modal 
const openRecipePopup = (meal) => {
  recipeDetailsContent.innerHTML = `
  <u><h2 class="recipeName">${meal.strMeal}</h2></u>
  <u><h3>Ingredients:</h3></u>
  <ul class="ingredientList">${fetchIngredients(meal)}</ul><br/>
  <div class="recipeInstructions">
    <u><h3>Instructions:</h3></u>
    <p>${meal.strInstructions}</p>
  </div>
  `
  
  //onclick of btn function will be call and it will become block
  recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseButton.addEventListener('click',()=>{
  recipeDetailsContent.parentElement.style.display = "none";
})

searchBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    if(!searchInput){
      recipeContainer.innerHTML = `<h2>Type The Meal Name In The SearchBox</h2>`
      return;
    }
    fetchRecipe(searchInput);
//   console.log("SearchButton clicked");
});

