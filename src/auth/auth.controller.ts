import { Body, Controller, ParseIntPipe, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

//preifx
@Controller('auth')

export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('signup')
    signup(@Body('email') email: String, @Body('password', ParseIntPipe) password: String) {
        console.log({
            email,
            password,
            emailType: typeof email,
            passwordType: typeof password
        })
        return this.authService.signup()
    }

    @Post('signin')
    signin() {

        return this.authService.login()
    }
}