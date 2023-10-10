import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private userId: string = '';


    setUserId(userId: string) {
        this.userId = userId;
    }

    getUserId() {
        return this.userId;
    }
}
