import { Injectable } from "@nestjs/common";
import {User,Bookmark} from "@prisma/client"

@Injectable({})

export class AuthService {

    signup() {
        return { msg: "I have Signup" }
    }
    login() {
        
        return { msg: "I have Login" }
    }

} 