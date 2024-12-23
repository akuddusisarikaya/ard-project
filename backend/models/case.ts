import {Schema, model, Document} from "mongoose"

export interface ICase extends Document{
    case_number : string;
    case_start_date : string;
    case_end_date : string;
    case_continue : boolean;
    application_number : string;
    lawyer : string;
    docs : string[];
    courts : string[];
}

const caseSchema = new Schema<ICase>({
    case_number : {type: String, required : false},
    case_start_date: {type : String, required: false},
    case_end_date: {type : String, required: false},
    case_continue : {type: Boolean, required: false},
    application_number : {type: String, required : true},
    lawyer : {type : String, required: false},
    docs : {type: [String], required : false},
    courts : {type: [String], required: false},
}, {
    timestamps : true,
});

const Case = model<ICase>('Case', caseSchema);

export default Case