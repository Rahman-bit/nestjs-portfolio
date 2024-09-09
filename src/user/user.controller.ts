import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Patch, Post } from "@nestjs/common";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Controller('user')

export class userController{
    constructor(private readonly userService : UserService ){}

    @Post()
    async create(@Body() user: User){
        const newUser = await this.userService.create(user)
        return newUser;
    }

    @Get()
    async getAllUsers(){
        const allUsers = await this.userService.findAllUsers();
        return allUsers
    }

    @Get(':id')
    getUser(@Param() id: string){
        console.log("UserId", id);
        return this.userService.findUser(id);
    }
    
    @Patch(':id')
    async update(@Param('id') userId: string, @Body() updatedUserDate: User){
        try{
            await this.userService.updateUser(userId, updatedUserDate);
        }catch(error){
            throw new HttpException({
                status : HttpStatus.FORBIDDEN,
                error : 'this is a custome error Message'
            },
            HttpStatus.FORBIDDEN,
                {
                    cause : error
                }
            )
        }
        return null;
    }
    @Delete(':id')
    async deleteUser(@Param('id') userId: string){
        try{
            await this.userService.remove(userId);
        }catch(error){
            throw new HttpException({
                status : HttpStatus.FORBIDDEN,
                error : 'Id getting custome error Message'
            },
            HttpStatus.FORBIDDEN,
                {
                    cause : error
                }
            )
        }
        return `user has been deleted ${userId}`
    }
}