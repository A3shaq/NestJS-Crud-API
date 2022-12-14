import { Controller, Get, UsePipes, ValidationPipe, UseGuards, Req } from "@nestjs/common";
import { Request } from "express"
import { JwtGuard } from "src/auth/guard";

@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true }))
export class UserController {
    @UseGuards(JwtGuard)
    @Get('me')
    getMe(@Req() req: Request) {

        return req.user

    }

}