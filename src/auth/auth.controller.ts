import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";

//preifx
@Controller('auth')

export class AuthController{
    constructor(private authService:AuthService){}
@Post('signup')
    signup(){

        return "I'm Signup"
    }

    @Post('signin')
    signin(){

        return "I'm Login"
    }
}