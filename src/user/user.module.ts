import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserSchema } from "./user.model";
import { userController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
    imports : [MongooseModule.forFeature([{name : 'User', schema : UserSchema }])],
    controllers : [userController],
    providers : [UserService]
})

export class UserModule{}