import { Injectable } from "@nestjs/common";

@Injectable({})

export class AuthService {

    signup() {
        return { msg: "I have Signup" }
    }
    login() {
        
        return { msg: "I have Login" }
    }

}