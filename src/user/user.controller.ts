import {Controller,Get,UsePipes,ValidationPipe } from "@nestjs/common";


@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true}))
export class UserController{
    @Get('me')
    getMe(){

        return 'User information'
    }

}