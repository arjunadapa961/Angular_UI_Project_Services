import { NgModule } from "@angular/core";
import { Routes, RouterModule, PreloadingStrategy, PreloadAllModules } from "@angular/router";

const appRoutes: Routes = [
    { path: "", redirectTo: "/recipes", pathMatch: "full" },
    {
        path: "recipes", loadChildren: () => import("./recipes/recipe.module").then(m => m.RecipeModule)
    },
    {
        path: "shopping-list", loadChildren: () => import("./shopping-list/shopping-list.module").then(m => m.ShoppinglistModule)
    },
    {
        path: "auth", loadChildren: () => import("./authentication/auth.module").then(m => m.AutheticationModule)
    }
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
    exports: [RouterModule]
})

export class AppRoutingModule {

}