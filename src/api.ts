export async function fetchCategories() {
  try {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data.meals.splice(0, 6);
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function fetchMeals(category: string) {
  if (category === "") return;
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const data = await response.json();
    return data.meals.splice(0, 6);
  } catch (error: any) {
    console.error(error.message);
  }
}

export async function fetchMealDetails(mealId: string) {
  try {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
    );
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    let data = await response.json();
    data = data.meals[0];
    const ingredients = [];
    for (let i = 1; i < 6; i++) {
      const ingredient = data[`strIngredient${i}`];
      const measure = data[`strMeasure${i}`];
      if (ingredient) {
        ingredients.push(measure ? `${measure} ${ingredient}` : ingredient);
      }
    }

    return {
      idMeal: data.idMeal,
      strMeal: data.strMeal,
      strMealThumb: data.strMealThumb,
      strInstructions: data.strInstructions,
      strCategory: data.strCategory,
      strArea: data.strArea,
      strYoutube: data.strYoutube,
      strSource: data.strSource,
      ingredients,
      tags: data.strTags?.split(",") || [],
    };
  } catch (error: any) {
    console.error(error.message);
  }
}
