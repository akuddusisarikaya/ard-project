import {Schema, model, Document} from "mongoose"

export interface ICourt extends Document {
    lawyer_id :string ;
    case_number : string;
    court_name : string;
    court_number: string;
    docs : string[];
    note : string;
}

const lavyerUploadsSchema = new Schema<ICourt>({
    lawyer_id: {type: String, required : true},
    case_number:  {type: String, required : true},
    court_name: {type: String, required : false},
    court_number: {type: String, required : false},
    docs :{type: [String], required : false},
    note : {type: String, required : false},
}, {
    timestamps :true,
})

const Court = model<ICourt>('Court', lavyerUploadsSchema);

export default Court