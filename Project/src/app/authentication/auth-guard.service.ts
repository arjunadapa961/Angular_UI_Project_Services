import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { map, tap } from "rxjs/operators";
import { AuthService } from "./auth.service";

@Injectable({ providedIn: "root" })

export class AuthGaurdService implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> {
        return this.authService.user.pipe(
            map(
                user => {
                    const isAuth = user ? true : false
                    if (isAuth) {
                        return true
                    }
                    return this.router.createUrlTree(['/auth'])
                }
            ),
            // tap(
            //     isAuth => {
            //         if(!isAuth){
            //           this.router.navigate(['/auth'])
            //         }
            //     }
            // )
        )
    }
}