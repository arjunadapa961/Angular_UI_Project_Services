import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Ingredient } from 'src/app/shopping-list/Ingredient.model';
import { ShoppigListService } from 'src/app/shopping-list/shoppig-list.service';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe
  id: number

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router, private shoppingListService: ShoppigListService) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']
          this.recipe = this.recipeService.getRecipes(this.id)
        }
      )
  }

  onAddIngredients() {
    this.recipeService.onAddIngredientsToShoppingList(this.recipe.ingredient)
  }



  onEditRecipe() {
    this.router.navigate(["edit"], { relativeTo: this.route })
  }

  onDeleteRecipe() {
    debugger
    this.recipeService.deleteRecipe(this.id)
    let deletingIngd = this.recipe.ingredient
    let ingredient: Ingredient[] = this.shoppingListService.getIngredients()
    for (let j = 0; j < ingredient.length; j++) {
      for (let i = 0; i < deletingIngd.length; i++) {
        if (deletingIngd[i].name === ingredient[j].name) {
          const updateIngredients = this.shoppingListService.onDeleteIngredients(j)
          // deletingIngd.splice(i, 1)
          ingredient = updateIngredients
        }
      }
    }
    // let x = this.recipe.ingredient;
    // // for (let i = 0; i < x.length; i++) {
    // //   this.shoppingListService.onDeleteIngredients(i)
    // // }
    this.router.navigate(["/recipes"])
  }
}
