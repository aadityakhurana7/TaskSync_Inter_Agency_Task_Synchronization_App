import { Observable, Frame } from '@nativescript/core';
import { authService } from '../../services/auth-service';

export class LoginViewModel extends Observable {
    private _username = '';
    private _password = '';
    private _errorMessage = '';

    constructor() {
        super();
    }

    get username() { return this._username; }
    set username(value: string) {
        if (this._username !== value) {
            this._username = value;
            this.notifyPropertyChange('username', value);
        }
    }

    get password() { return this._password; }
    set password(value: string) {
        if (this._password !== value) {
            this._password = value;
            this.notifyPropertyChange('password', value);
        }
    }

    get errorMessage() { return this._errorMessage; }
    set errorMessage(value: string) {
        if (this._errorMessage !== value) {
            this._errorMessage = value;
            this.notifyPropertyChange('errorMessage', value);
        }
    }

    login() {
        const result = authService.login(this.username, this.password);
        if (result.success) {
            Frame.topmost().navigate({
                moduleName: 'pages/jobs-list/jobs-list-page',
                clearHistory: true
            });
        } else {
            this.errorMessage = result.error || 'Login failed';
        }
    }

    loginAsUser() {
        const result = authService.login(this.username, '');
        if (result.success) {
            Frame.topmost().navigate({
                moduleName: 'pages/jobs-list/jobs-list-page',
                clearHistory: true
            });
        } else {
            this.errorMessage = result.error || 'Login failed';
        }
    }
}