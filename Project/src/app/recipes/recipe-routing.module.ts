import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { AuthGaurdService } from "../authentication/auth-guard.service";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeResolverService } from "./recipe-resolver.service";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";
import { RecipesComponent } from "./recipes.component";

const appRoutes = [
    {
        path: "", component: RecipesComponent, canActivate: [AuthGaurdService], resolve: [RecipeResolverService], children: [
            { path: "", component: RecipeStartComponent },
            { path: "new", component: RecipeEditComponent },
            { path: ":id", component: RecipeDetailComponent, resolve: [RecipeResolverService] },
            { path: ":id/edit", component: RecipeEditComponent, resolve: [RecipeResolverService] }
        ]
    },
]

@NgModule({
    declarations: [],
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
})


export class RecipeRoutingModule {

}