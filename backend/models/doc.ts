import {Schema, model , Document} from "mongoose";

export interface IDoc extends Document {
    doc_name : string;
    doc_id : string;
    doc_url : string;
    describe : string;
}

const docShema = new Schema<IDoc>({
    doc_name : {type : String, required: true},
    doc_id : {type : String, required: false},
    doc_url: {type : String, required: true},
    describe : {type : String, required : false},
},{
    timestamps: true,
})

const Doc = model<IDoc>('Doc', docShema);

export default Doc