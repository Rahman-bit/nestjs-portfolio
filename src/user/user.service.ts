import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { User, UserDocument } from "./user.model";

@Injectable()
export class UserService{

    constructor(@InjectModel('User') private userModel: Model<UserDocument>) {}

   async create(user: User){
        const newUser = new this.userModel(user)
        const result = await newUser.save();
        // console.log("Result:", result);
        return result
    }

    async findAllUsers(){
        const allusers = await this.userModel.find().exec();
        return allusers.map((user)=>({
            id : user.id,
            firstName : user.firstName,
            lastName : user.lastName,
            city : user.city,
            state : user.state,
            message : user.message
        })) 
    }
    async findUser(id: string): Promise<UserDocument>{
      
        let user;
        try{
            // const testId = '66d0c9b5eb80a52a451f3d03';
             user = await this.userModel.findById(id).exec();
           console.log("user Find:", user)
        }catch(error){
            throw new NotFoundException(' Could not found product', error)
        }
        if(!user) throw new NotFoundException(' Could not found product');
        console.log("user Find:", user)
        return user;
    }

    async updateUser(userId: string, updatedUserDate: User){
        const userDataBase = await this.userModel.findById(userId);
        // console.log('userDataBase:', userDataBase)
        if (updatedUserDate.firstName) userDataBase.firstName = updatedUserDate.firstName;
        if (updatedUserDate.lastName) userDataBase.lastName = updatedUserDate.lastName;
        if (updatedUserDate.email) userDataBase.email = updatedUserDate.email;
        if (updatedUserDate.city) userDataBase.city = updatedUserDate.city;
        if (updatedUserDate.state) userDataBase.state = updatedUserDate.state;
        if (updatedUserDate.message) userDataBase.message = updatedUserDate.message;
        userDataBase.save();
        return `User Data has been updated with Id : ${userId}`;
    }
    async remove(userId: string){
        const user = await this.userModel.deleteOne({_id : userId}).exec();
        console.log("UserId:", user)
        if(user.deletedCount === 0) throw new NotFoundException(" Could not found product")
       return `${user} ID has been deleted`
    }
}