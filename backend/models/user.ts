import {Schema, model, Document} from "mongoose"

export interface IUser extends Document{
    name:string;
    user_name : string;
    password : string;
    cases : string[];
    role : string;
}

const userSchema = new Schema<IUser>({
    name:{type: String, required: false},
    user_name : {type : String, required: true},
    password : {type : String , required:true},
    cases : {type : [String], required: false},
    role : {type : String, required: true},
},{
    timestamps: true,
}
)

const User = model<IUser>('User', userSchema);

export default User