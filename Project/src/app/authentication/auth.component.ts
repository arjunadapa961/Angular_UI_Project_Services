import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { AlertComponent } from "../shared/alert/alert.component";
import { PlaceHolderDirective } from "../shared/placeholder/placeholder.directive";
import { AuthService, AuthResponseData } from "./auth.service";

@Component(
    {
        selector: 'app-authenticate',
        templateUrl: './auth.component.html',
        styleUrls: ['./auth.component.css']
    }
)

export class Authentication implements OnInit, OnDestroy {
    isLoginMode = true
    isLoading = false
    errorMessage = null
    @ViewChild(PlaceHolderDirective) holderDirective: PlaceHolderDirective

    private closeSub: Subscription

    constructor(private authService: AuthService, private router: Router, private componentFactoryResolver: ComponentFactoryResolver) { }

    ngOnInit() { }

    ngOnDestroy() {
        if (this.closeSub) {
            this.closeSub.unsubscribe()
        }
    }

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
                // this.errorMessage = errorMessage
                this.showAlertError(errorMessage)
                this.isLoading = false
            }
        )
        form.reset()
    }

    onHandleError() {
        this.errorMessage = null
    }

    public showAlertError(errorMessage: string) {
        //   const alertComp = new AlertComponent()
        const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent)
        const hostViewContainerRef = this.holderDirective.viewContainerRef
        hostViewContainerRef.clear()
        const componentRef = hostViewContainerRef.createComponent(alertCmpFactory)
        componentRef.instance.message = errorMessage
        this.closeSub = componentRef.instance.close.subscribe(() => {
            this.closeSub.unsubscribe()
            hostViewContainerRef.clear()
        })
    }
}