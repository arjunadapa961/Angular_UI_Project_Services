import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Ingredient } from './Ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppigListService {
  ingredientsChanged = new Subject<Ingredient[]>()
  startEditing = new Subject<number>();

  private ingredients: Ingredient[] = [
    new Ingredient("Apple", 5),
    new Ingredient("Tomatoes", 5)
  ]

  constructor() { }

  getIngredients() {
    return this.ingredients.slice()
  }

  getIngredientsEditedItem(index: number) {
    return this.ingredients[index]
  }

  onAddIngredients(ingredient: Ingredient) {
    this.ingredients.push(ingredient)
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  onAddIngredientsToShoppingList(ingredient: Ingredient[]) {
    this.ingredients.push(...ingredient);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  onUpdateIngredients(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice())
  }

  onDeleteIngredients(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice())
  }

}
