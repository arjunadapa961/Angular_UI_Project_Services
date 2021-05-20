import { ElementSchemaRegistry } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number
  editMode: boolean = false
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.intForm()
        }
      )
  }

  private intForm() {
    let recipeName = '',
      recipeDescription = '',
      recipeImageUrl = '',
      recipeIngredients = new FormArray([])

    if (this.editMode) {
      let recipes = this.recipeService.getRecipes(this.id)
      recipeName = recipes.name
      recipeDescription = recipes.description
      recipeImageUrl = recipes.imagePath

      if (recipes['ingredient']) {
        for (let ingredient of recipes.ingredient) {
          recipeIngredients.push(new FormGroup({
            'name': new FormControl(ingredient.name, Validators.required),
            'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }))
        }
      }

    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImageUrl, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredient': recipeIngredients
    })
  }

  get Controls() {
    return (<FormArray>this.recipeForm.get('ingredient')).controls
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredient')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
      })
    )
  }

  onSubmit() {
    if (this.editMode) {
      console.log(this.recipeForm)
      this.recipeService.updateRecipe(this.id, this.recipeForm.value)
    } else {
      this.recipeService.addRecipe(this.recipeForm.value)
    }
    this.onCancel()
  }

  onCancel() {
    this.router.navigate(["../"], { relativeTo: this.route })
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredient')).removeAt(index)
  }
}
