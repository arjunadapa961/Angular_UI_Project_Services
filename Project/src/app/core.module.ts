import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { AuthInterceptor } from "./authentication/auth-interceptor.service";
import { RecipeService } from "./recipes/recipe.service";
import { ShoppigListService } from "./shopping-list/shoppig-list.service";


@NgModule({
    providers: [
        ShoppigListService,
        RecipeService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AuthInterceptor,
            multi: true
        }
    ],
})

export class CoreModule { }