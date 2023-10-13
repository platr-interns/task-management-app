import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class UserDataService {
    private userData: { id: string, name: string } = { id: '', name: '' };

    setUserData(id: string, name: string) {
        this.userData = { id, name };
    }

    getUserData() {
        return this.userData;
    }

    getUserId() {
        return this.userData.id;
    }

    getUserName() {
        return this.userData.name;
    }
}
