import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
    firstName : {type : String, require : true},
    lastName : {type : String, require : true},
    email : {type : String, require : true},
    city : {type : String, require : true},
    state : {type : String, require : true},
    message : {type : String, require : true}
})

export interface User {
    id :string;
    firstName : string;
    lastName : string;
    email : string;
    city : string;
    state : string;
    message : string;
}

export interface UserDocument extends User, mongoose.Document{
    id :string;
    firstName : string;
    lastName : string;
    email : string;
    city : string;
    state : string;
    message : string;
}
