import { User } from "../models/user.model";

export interface UserState {
    user?: User;
    users: User[];
    loading: boolean;
    error: any;
}