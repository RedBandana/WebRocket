import { Document } from 'mongoose';

export interface User extends Document {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    type: 'guest' | 'requester' | 'agent' | 'administrator';
    timeCreated?: Date;
}