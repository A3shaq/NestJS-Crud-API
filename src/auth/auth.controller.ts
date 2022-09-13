import { Body, Controller, Post,UsePipes,ValidationPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./dto";

//preifx
@Controller('auth')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true}))

export class AuthController {
    constructor(private authService: AuthService) { }
    @Post('signup')
    signup(@Body() dto: AuthDto) {
        console.log({dto})
        return this.authService.signup(dto)
    }

    @Post('signin')
    signin() {  

        return this.authService.login()
    }
}