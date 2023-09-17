import { Schema } from 'mongoose';

export const RequestSchema = new Schema({
    requesterId: { type: Schema.Types.ObjectId, ref: 'User' },
    agentId: { type: Schema.Types.ObjectId, ref: 'User' },
    mainInterest: { type: String, enum: ['find opportunity', 'improve situation']},
    introducedBy: String,
    timeCreated: { type: Date, default: Date.now },
});