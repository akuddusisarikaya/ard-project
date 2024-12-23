import {Schema, model, Document} from 'mongoose';

export interface IApplication extends Document {
    application_number : string;
    application_date : string;
    applicant_name: string;
    applicant_family_name : string;
    applicant_id : string;
    applicant_phone: string;
    applicant_email: string;
    applicant_address: string;
    case_category: string;
    explantation: string;
    self_applicant : boolean;
    applicant_type : string;
    applicant: string;
    application_approver: string;
    case_id : string;
    docs : string[];
    links : string[];
    status : string;
    caseble : boolean;
}

const applicationSchema = new Schema<IApplication>({
    application_number : {type : String, required :false},
    application_date : {type : String, required: false},
    applicant_name : {type : String, required:false},
    applicant_family_name : {type :String, required: false},
    applicant_id : {type : String , required:false},
    applicant_phone: {type :String , required : false},
    applicant_email : {type :String, required: false},
    applicant_address :{type : String, required:false},
    case_category : {type : String, required:false},
    explantation : {type : String, required: false},
    self_applicant : {type : Boolean, required: false},
    applicant_type :{type : String, required : false},
    applicant : {type: String, required: false},
    application_approver : {type : String, required:false},
    case_id : {type : String, required: false},
    docs : {type : [String], required :false},
    links : {type : [String], required: false},
    status : {type : String, required : false},
    caseble : {type: Boolean, required : false},
}, {
    timestamps: true,
})

const Application = model<IApplication>('Application', applicationSchema);

export default Application