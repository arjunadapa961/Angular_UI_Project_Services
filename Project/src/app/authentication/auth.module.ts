import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { SharedModule } from "../shared/shared.module";
import { Authentication } from "./auth.component";


const appRoutes = [
    { path: "", component: Authentication }
]

@NgModule({
    declarations: [Authentication],
    imports: [RouterModule.forChild(appRoutes), FormsModule, SharedModule, CommonModule],
    exports: [RouterModule]
})

export class AutheticationModule { }