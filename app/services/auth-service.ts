import { Observable } from '@nativescript/core';
import { User } from '../models/user';

class AuthService extends Observable {
    private currentUser: User | null = null;
    private readonly ADMIN_PASSWORD = 'admin123';

    login(username: string, password: string): { success: boolean; error?: string } {
        if (!username.trim()) {
            return { success: false, error: 'Username is required' };
        }

        if (password === this.ADMIN_PASSWORD) {
            this.currentUser = { username, role: 'admin' };
            return { success: true };
        } else if (password) {
            return { success: false, error: 'Invalid admin password' };
        } else {
            this.currentUser = { username, role: 'user' };
            return { success: true };
        }
    }

    logout() {
        this.currentUser = null;
        this.notifyPropertyChange('currentUser', null);
    }

    isAdmin(): boolean {
        return this.currentUser?.role === 'admin';
    }

    getUser(): User | null {
        return this.currentUser;
    }

    isLoggedIn(): boolean {
        return this.currentUser !== null;
    }
}

export const authService = new AuthService();