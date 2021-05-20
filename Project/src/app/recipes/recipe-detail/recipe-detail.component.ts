import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
    this.recipeService.deleteRecipe(this.id)
    // let x = this.recipe.ingredient;
    // // for (let i = 0; i < x.length; i++) {
    // //   this.shoppingListService.onDeleteIngredients(i)
    // // }
    this.router.navigate(["/recipes"])
  }
}
