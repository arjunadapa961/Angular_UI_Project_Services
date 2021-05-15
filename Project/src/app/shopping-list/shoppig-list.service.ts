import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from './Ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppigListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>()

  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Tomatoes", 5)
  ]

  constructor() { }

  getIngredients() {
    return this.ingredients.slice()
  }

  onAddIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

  onAddIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.emit(this.ingredients.slice())
  }

}
