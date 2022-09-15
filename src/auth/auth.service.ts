import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from "argon2"
import { PrismaClientKnownRequestError, PrismaClientValidationError } from "@prisma/client/runtime";

@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) {

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
            return user
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
        delete user.hash
        return { ...user, message: "Success login", succes: true }
    }

} 