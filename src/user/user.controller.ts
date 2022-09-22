import {Controller,Get,UsePipes,ValidationPipe,UseGuards } from "@nestjs/common";
import {AuthGuard} from "@nestjs/passport"


@Controller('users')
@UsePipes(new ValidationPipe({ transform: true, whitelist: true}))
export class UserController{
    @UseGuards(AuthGuard('jwt'))
    @Get('me')
    getMe(){

        return 'User information'
    }

}