import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shopping-list/Ingredient.model';
import { ShoppigListService } from '../shopping-list/shoppig-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe("Kebab",
      "A Tasty Kebab",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE0KYT0fgQFHwA6gWgZC9uGdC6HW1zvwWblA&usqp=CAU",
      [
        new Ingredient('Paneer', 5),
        new Ingredient('Tomatoes', 5)
      ]
    ),
    new Recipe("Dum Biryani",
      "A Tasty Dum Biryani",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShHzlYvaRhBNG0pO3qMhGbflt3KU-xiqxhsQ&usqp=CAU",
      [
        new Ingredient('chicken', 1),
        new Ingredient('Onions', 3),
        new Ingredient('lemon', 3)
      ])
  ]
  constructor(private shoppingListService: ShoppigListService) { }

  getRecipe() {
    return this.recipes.slice()
  }

  getRecipes(index: number) {
    return this.recipes[index]
  }

  onAddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.onAddIngredientsToShoppingList(ingredients)
  }
}
