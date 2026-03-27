let searchBar = document.querySelector(".searchBar");
let searchBtn = document.querySelector("#searchBtn");
let recipeContainer = document.querySelector(".recipe-container");
const recipeDetailsContent = document.querySelector(".recipe-details-content");
const recipeCloseBtn = document.querySelector(".recipe-close-btn");




const fetchRecipes = async (recipe)=>{
    recipeContainer.innerHTML="<h2>Fetching Recipes...</h2>";
    try {
        const data =await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${recipe}`);
    const response = await data.json();

    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML = `<img src=${meal.strMealThumb}>
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea}</p>
        <p>${meal.strCategory}</p>`;
        const button = document.createElement('button');
        button.textContent="View Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener("click",()=>{
            openPopUp(meal);
        })
        recipeContainer.appendChild(recipeDiv);
    });
    } catch (error) {
         recipeContainer.innerHTML="<h2>No meal matches the input🥲</h2>"
    }
}

const openPopUp = (meal)=>{
   
   recipeDetailsContent.innerHTML = `
   <h2 class="recipe-name">${meal.strMeal}</h2>
   <h2>Ingriendts:</h2>
   <ul class="ingredientList">${fetchIngredients(meal)}</ul>
   <div>
     <h3>Instructions:</h3>
     <p class="recipeInstructions">${meal.strInstructions}</p>
    </div> 
   `;
   recipeDetailsContent.parentElement.style.display = "block";
}

const fetchIngredients = (meal)=>{
    let ingredientList = "";
    for(let i = 1;i<=20;i++){
        const ingredient = meal[`strIngredient${i}`];
        if(ingredient){
            const measure = meal[`strMeasure${i}`];
            ingredientList+=`<li>${ingredient} ${measure} </li>`;
        }
        else{
            break;
        }
    }
    return ingredientList;
}

recipeCloseBtn.addEventListener("click",()=>{
    recipeDetailsContent.parentElement.style.display="none";
})
searchBtn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    const searchInput = searchBar.value.trim();
    if(!searchInput){
        recipeContainer.innerHTML="<h2>Enter you fav Meal...</h2>"
        return;
    }
    fetchRecipes(searchInput);
}
);