import { Module } from "@nestjs/common"
import { JwtModule } from "@nestjs/jwt"
import { UserController } from "./user.controller";


@Module({
    imports: [JwtModule.register({ })],
    controllers: [UserController],
    // providers: [AuthService,JwtStrategy]
})
export class UserModule { }

