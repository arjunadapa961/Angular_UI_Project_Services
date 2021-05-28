import { NgModule } from "@angular/core";
import { AlertComponent } from "./alert/alert.component";
import { DropdownDirective } from "./dropdown.directive";
import { LoadingSpinner } from "./loading-spinner/loading-spinner.component";
import { PlaceHolderDirective } from "./placeholder/placeholder.directive";

@NgModule({
    declarations: [
        DropdownDirective,
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective
    ],
    imports: [],
    exports: [
        DropdownDirective,
        LoadingSpinner,
        AlertComponent,
        PlaceHolderDirective
    ]
})
export class SharedModule {

}