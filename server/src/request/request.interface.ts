import { Document } from 'mongoose';

export interface Request extends Document {
    agentId?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    mainInterest: 'find opportunity' | 'improve situation',
    introducedBy: string;
    timeCreated?: Date; 
}