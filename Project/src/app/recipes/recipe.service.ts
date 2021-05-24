import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from '../shopping-list/Ingredient.model';
import { ShoppigListService } from '../shopping-list/shoppig-list.service';
import { Recipe } from './recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>()

  // private recipes: Recipe[] = [
  //   new Recipe("Kebab",
  //     "A Tasty Kebab",
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSE0KYT0fgQFHwA6gWgZC9uGdC6HW1zvwWblA&usqp=CAU",
  //     [
  //       new Ingredient('Paneer', 5),
  //       new Ingredient('Tomatoes', 5)
  //     ]
  //   ),
  //   new Recipe("Dum Biryani",
  //     "A Tasty Dum Biryani",
  //     "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcShHzlYvaRhBNG0pO3qMhGbflt3KU-xiqxhsQ&usqp=CAU",
  //     [
  //       new Ingredient('chicken', 1),
  //       new Ingredient('Onions', 3),
  //       new Ingredient('lemon', 3)
  //     ])
  // ]

  private recipes: Recipe[] = []

  constructor(private shoppingListService: ShoppigListService) { }

  getRecipe() {
    return this.recipes.slice()
  }

  getRecipes(index: number) {
    return this.recipes[index]
  }

  setRecipes(recipe: Recipe[]) {
    this.recipes = recipe
    this.recipeChanged.next(this.recipes.slice())
  }

  onAddIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.onAddIngredientsToShoppingList(ingredients)
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe)
    this.recipeChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe
    this.recipeChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1)
    this.recipeChanged.next(this.recipes.slice())
  }
}
