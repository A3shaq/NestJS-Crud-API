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

            delete user.hash
            return user
        }
        catch (error) {

            if (error instanceof PrismaClientKnownRequestError) {

                // P2002 error code satnds for duplicate field error
                if (error.code === 'P2002') {
                    throw new ForbiddenException("Email already exist")
                }
            }

            throw error;
        }
        // we need to return the saved user

        // directy solution remove specfic key
    }
    login() {

        return { msg: "I have Login" }
    }

} 