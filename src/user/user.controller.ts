import { Controller, Get, UsePipes, ValidationPipe, UseGuards, Req } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport"
import { Request } from "express"

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UserController {
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(@Req() req: Request) {

        return req.user

    }

}