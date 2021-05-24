import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService, AuthResponseData } from "./auth.service";

@Component(
    {
        selector: 'app-authenticate',
        templateUrl: './auth.component.html',
        styleUrls: ['./auth.component.css']
    }
)

export class Authentication implements OnInit {
    isLoginMode = true
    isLoading = false
    errorMessage = null


    constructor(private authService: AuthService, private router: Router) { }

    ngOnInit() { }


    onSwitchToLogin() {
        this.isLoginMode = !this.isLoginMode
    }

    onSubmit(form: NgForm) {
        if (!form.valid) {
            return;
        }

        const email = form.value.email;
        const password = form.value.password;

        let authObs: Observable<AuthResponseData>

        this.isLoading = true;
        if (this.isLoginMode) {
            ///
            authObs = this.authService.login(email, password)
        } else {
            authObs = this.authService.signUp(email, password)
        }
        authObs.subscribe(
            resData => {
                console.log(resData)
                this.isLoading = false
                this.router.navigate(["/recipes"])
            },
            errorMessage => {
                console.log(errorMessage)
                this.errorMessage = errorMessage
                this.isLoading = false
            }
        )
        form.reset()
    }
}