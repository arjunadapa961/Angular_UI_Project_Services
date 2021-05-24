import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { throwError, BehaviorSubject } from "rxjs";
import { catchError, tap, throwIfEmpty } from "rxjs/operators";
import { UserModel } from "./user.model";

export interface AuthResponseData {
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered?: boolean
}

@Injectable({ providedIn: 'root' })

export class AuthService {

    user = new BehaviorSubject<UserModel>(null)

    autoLogoutExpiresDate: any;

    constructor(private http: HttpClient, private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAGk0yhi_X-mtVRamlR1YenI_FOZ8DOe_U',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(
            catchError(this.handleError),
            tap(
                respData => {
                    this.handleAuthData(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
                }
            )
        )
    }

    login(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAGk0yhi_X-mtVRamlR1YenI_FOZ8DOe_U', {
            email: email,
            password: password,
            returnSecureToken: true
        }).pipe(
            catchError(this.handleError),
            tap(
                respData => {
                    this.handleAuthData(respData.email, respData.localId, respData.idToken, +respData.expiresIn)
                }
            )
        )
    }

    private handleAuthData(email: string, id: string, token: string, expiresIn: number) {
        const expiresInDate = new Date(new Date().getTime() + +expiresIn * 1000)
        const userModel = new UserModel(
            email,
            id,
            token,
            expiresInDate
        )
        this.user.next(userModel)
        this.autoLogout(expiresIn * 1000)
        localStorage.setItem('userData', JSON.stringify(userModel))
    }

    logout() {
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')
        if (this.autoLogoutExpiresDate) {
            clearTimeout(this.autoLogoutExpiresDate)
        }
        this.autoLogoutExpiresDate = null
    }

    autoLogout(expiresData) {
        this.autoLogoutExpiresDate = setTimeout(
            () => {
                this.logout()
            }, expiresData)
    }

    autoLogin() {
        let userData: {
            email: string,
            id: string,
            _token: string,
            _tokenExpiresInDate: string
        } = JSON.parse(localStorage.getItem('userData'))
        if (!userData) {
            return;
        }
        const loadedUser = new UserModel(userData.email, userData.id, userData._token, new Date(userData._tokenExpiresInDate))
        if (loadedUser.token) {
            this.user.next(loadedUser)
            const expiresDuration = new Date(userData._tokenExpiresInDate).getTime() - new Date().getTime()
            this.autoLogout(expiresDuration)
        }
    }

    private handleError(errorResponse: HttpErrorResponse) {
        let errorMessage = 'An unknown error occured'
        if (!errorResponse.error || !errorResponse.error.error) {
            return throwError(errorMessage)
        }
        else {
            switch (errorResponse.error.error.message) {
                case "EMAIL_EXISTS":
                    errorMessage = "The email address is already in use by another account"
                    break;
                case "EMAIL_NOT_FOUND":
                    errorMessage = "There is no user record corresponding to this identifier. The user may have been deleted"
                    break;
                case "INVALID_PASSWORD":
                    errorMessage = "The password is invalid or the user does not have a password"
                    break;
            }
            return throwError(errorMessage)
        }
    }

}