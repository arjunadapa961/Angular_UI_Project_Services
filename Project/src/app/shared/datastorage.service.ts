import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { exhaustMap, map, take, tap } from "rxjs/operators"
import { Ingredient } from "../shopping-list/Ingredient.model";
import { AuthService } from "../authentication/auth.service";


@Injectable({
    providedIn: "root"
})

export class DataStorageService {

    constructor(private http: HttpClient, private recipeService: RecipeService, private authService: AuthService) { }

    storeRecipes() {
        const recipes = this.recipeService.getRecipe()
        this.http.put("https://angular-recipe-book-81b40-default-rtdb.firebaseio.com/recipes.json", recipes)
            .subscribe(
                responseData => {
                    console.log(responseData)
                }
            )
    }


    fetchRecipes() {
        return this.http.get<Recipe[]>(
            "https://angular-recipe-book-81b40-default-rtdb.firebaseio.com/recipes.json"
        ).pipe(
            map(
                recipesFromRequest => {
                    return recipesFromRequest.map(
                        recipesFromMap => {
                            return {
                                ...recipesFromMap,
                                ingredient: recipesFromMap.ingredient ? recipesFromMap.ingredient : []
                            }
                        }
                    )
                }
            ),
            tap(
                recipe => {
                    this.recipeService.setRecipes(recipe)
                }
            )
        )
    }
}