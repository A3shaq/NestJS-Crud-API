import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config"

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService, private jwt: JwtService, private config: ConfigService) {

    }
    async signup(dto: AuthDto) {
        // Generate the passoword hash
        const hash = await argon.hash(dto.password)

        // Save the new user in the db

        try {
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }

            })

            // directy solution remove specfic key
            delete user.hash
            // we need to return the saved user
            return this.signToken(user.id, user.email)
        }
        catch (error) {
            //throw custome error
            if (error instanceof PrismaClientKnownRequestError) {

                // P2002 error code satnds for duplicate field error
                if (error.code === 'P2002') {
                    throw new ForbiddenException("Email already exist")
                }
            }

            throw error;
        }

    }
    async login(dto: AuthDto) {

        // find the user by email
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        })
        // if user does not exist throw an exception
        if (!user) throw new ForbiddenException("Credentials incorrect")
        // compare password

        const pwMatches = await argon.verify(user.hash, dto.password)
        // if password incorrect throw an exception
        if (!pwMatches) throw new ForbiddenException("Credentials incorrect")


        // if every things goes well send back the user
        // delete user.hash
        // return { ...user, message: "Success login" }
        return this.signToken(user.id, user.email)
    }

    async signToken(userId: number, email: string): Promise<{ access_token: string,success:boolean,message:string }> {

        const payload = {
            sub: userId,
            email
        }

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '30m',
            secret: this.config.get('JWT_SECRET')
        })

        return {
            access_token: token,
            success:true,
            message:"Login Successfully"
        }
    }

} 