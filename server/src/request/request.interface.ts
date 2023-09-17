import { Document } from 'mongoose';

export interface Request extends Document {
    requesterId: string;
    agentId: string;
    mainInterest: 'find opportunity' | 'improve situation',
    introducedBy: string;
    timeCreated?: Date; 
}