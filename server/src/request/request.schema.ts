import { Schema } from 'mongoose';

export const RequestSchema = new Schema({
    agentId: { type: Schema.Types.ObjectId, ref: 'User' },
    firstName: String,
    lastName: String,
    email: { type: String, unique: false },
    phone: String,
    mainInterest: { type: String, enum: ['find opportunity', 'improve situation']},
    introducedBy: String,
    timeCreated: { type: Date, default: Date.now },
});