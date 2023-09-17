import { Schema } from 'mongoose';
import { hash as bcryptHash } from 'bcrypt';

export const UserSchema = new Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    phone: String,
    password: String,
    type: {
        type: String,
        enum: ['guest', 'requester', 'agent', 'administrator'],
        default: 'guest'
    },
    timeCreated: { type: Date, default: Date.now }
});

UserSchema.pre('save', async function(next: any) {
    try {
        if (!this.isModified('password')) {
            return next();
        }
        const hashed = await bcryptHash(this['password'], 10);
        this['password'] = hashed;
        return next();
    } catch (err) {
        return next(err);
    }
});
