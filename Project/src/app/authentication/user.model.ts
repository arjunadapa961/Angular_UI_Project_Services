export class UserModel {

    constructor(public email: string, public id: string, private _token: string, private _tokenExpiresInDate: Date) { }

    get token() {
        if (!this._tokenExpiresInDate || new Date() > this._tokenExpiresInDate) {
            return null
        }
        return this._token
    }

}